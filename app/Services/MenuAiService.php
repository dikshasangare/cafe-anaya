<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MenuAiService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    protected string $model   = 'llama-3.3-70b-versatile';

    public function __construct()
    {
        $this->apiKey = env('GROQ_API_KEY');
    }

    public function generateMenuDetails(string $dishName): array
    {
        $prompt = <<<PROMPT
                You are a restaurant menu expert for an Indian fusion café.
                Given ONLY the dish name, generate realistic menu details.

                Dish name: {$dishName}

                Return ONLY a valid JSON object with exactly these fields, no extra text:
                {
                "description": "50-sentence appetizing menu description, max 400 words, including sensory profile and appeal",
                "short_description": "1 catchy sentence, max 30 words",
                "ingredients": ["An array of strings listing main ingredients for this specific dish"],
                "preparation_time": 0,
                "cooking_style": "Determine the most likely cooking method e.g. Grilled, Slow-cooked, Pan-fried,Braised, Tandoor-roasted",
                "calories": "Estimated calories based on the dish composition e.g. 320 kcal",
                "cuisine_type": "Identify the specific cuisine origin or style e.g. Indian Fusion, North Indian, South Indian",
                "spice_level": "Select the appropriate heat level: Mild, Medium, Hot, Extra Hot"
                }

                Rules:
                - ingredients must be a JSON array of strings
                - preparation_time must be a number (minutes), no text
                - calories must include kcal unit
                - spice_level must be one of: Mild, Medium, Hot, Extra Hot
                - Return ONLY the JSON, no markdown, no backticks, no explanation
            PROMPT;
        try {
            $response = Http::timeout(20)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type'  => 'application/json',
                ])
                ->post($this->baseUrl, [
                    'model'       => $this->model,
                    'messages'    => [
                        ['role' => 'system', 'content' => 'You are a restaurant menu expert. Always respond with valid JSON only. No markdown, no backticks.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'max_tokens'  => 400,
                    'temperature' => 0.7,
                ]);

            if ($response->failed()) {
                Log::error('Groq generateMenuDetails failed', [
                    'status' => $response->status(),
                    'body'   => $response->json(),
                ]);
                return [];
            }

            $content = $response->json('choices.0.message.content', '');

            // Strip markdown backticks if model adds them anyway
            $content = preg_replace('/```json|```/i', '', $content);
            $content = trim($content);

            $data = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Groq JSON parse failed', ['raw' => $content]);
                return [];
            }

            return $data;
        } catch (\Exception $e) {
            Log::error('MenuAiService::generateMenuDetails error: ' . $e->getMessage());
            return [];
        }
    }
}
