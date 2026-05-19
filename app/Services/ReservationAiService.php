<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ReservationAiService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    protected string $model   = 'llama-3.3-70b-versatile';

    public function __construct()
    {
        $this->apiKey = env('GROQ_API_KEY');
    }

    public function parseReservation(string $userMessage): array
    {
        $today       = now()->format('Y-m-d');
        $dayOfWeek   = now()->format('l');
        $currentTime = now()->format('H:i');

        // NOTE: heredoc closing tag must be at column 0, no indentation
        $prompt = <<<PROMPT
Today is {$today} ({$dayOfWeek}). Current time is {$currentTime}.

Extract reservation details from the customer message below.
Return ONLY a valid JSON object — no extra text, no markdown, no backticks.

Customer message: "{$userMessage}"

Return this exact JSON structure:
{
  "date": "YYYY-MM-DD or null",
  "time": "HH:MM (24-hour) or null",
  "party_size": number or null,
  "special_requests": "string or null",
  "confidence": "high | medium | low"
}

Rules:
- Resolve relative dates: "tomorrow" = next day from {$today}, "next Saturday" = next upcoming Saturday from {$today}
- Resolve relative times: "evening" = 19:00, "lunch" = 12:30, "dinner" = 19:00, "morning" = 09:00, "night" = 20:00
- party_size must be a plain number only (e.g. 4), no text like "4 people"
- special_requests: capture dietary needs, occasion, seating preference etc. Set null if none.
- confidence: "high" if date + time + party_size all found, "medium" if 2 found, "low" if 1 or fewer
- If a field is unclear or missing, set it to null
PROMPT;

        try {
            $response = Http::timeout(15)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type'  => 'application/json',
                ])
                ->post($this->baseUrl, [
                    'model'       => $this->model,
                    'messages'    => [
                        [
                            'role'    => 'system',
                            'content' => 'You are a reservation parser. Always respond with valid JSON only. No markdown, no explanation, no backticks.',
                        ],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'max_tokens'  => 200,
                    'temperature' => 0.1,
                ]);

            if ($response->failed()) {
                Log::error('ReservationAiService failed', [
                    'status' => $response->status(),
                    'body'   => $response->json(),
                ]);
                return $this->emptyResult();
            }

            $content = $response->json('choices.0.message.content', '');

            // Strip markdown backticks if model adds them anyway
            $content = preg_replace('/```json|```/i', '', $content);
            $content = trim($content);

            $data = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('ReservationAiService JSON parse failed', ['raw' => $content]);
                return $this->emptyResult();
            }

            return $data;
        } catch (\Exception $e) {
            Log::error('ReservationAiService error: ' . $e->getMessage());
            return $this->emptyResult();
        }
    }

    private function emptyResult(): array
    {
        return [
            'date'             => null,
            'time'             => null,
            'party_size'       => null,
            'special_requests' => null,
            'confidence'       => 'low',
        ];
    }
}
