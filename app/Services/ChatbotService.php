<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    protected string $model   = 'llama-3.3-70b-versatile';

    public function __construct()
    {
        $this->apiKey = env('GROQ_API_KEY');
    }

    public function chat(array $history, string $userMessage): string
    {
        $systemPrompt = $this->buildSystemPrompt();

        $messages = [
            ['role' => 'system', 'content' => $systemPrompt],
            ...$history,
            ['role' => 'user', 'content' => $userMessage],
        ];

        try {
            $response = Http::timeout(20)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type'  => 'application/json',
                ])
                ->post($this->baseUrl, [
                    'model'       => $this->model,
                    'messages'    => $messages,
                    'max_tokens'  => 300,
                    'temperature' => 0.7,
                ]);

            if ($response->failed()) {
                Log::error('Chatbot API error', [
                    'status' => $response->status(),
                    'body'   => $response->json(),
                ]);
                return 'Sorry, I am having trouble responding right now. Please try again.';
            }

            return $response->json('choices.0.message.content', '');
        } catch (\Exception $e) {
            Log::error('ChatbotService error: ' . $e->getMessage());
            return 'Sorry, something went wrong. Please try again.';
        }
    }

    private function buildSystemPrompt(): string
    {
        $menu = Menu::where('is_available', true)
            ->get(['name', 'description', 'price', 'ingredients', 'spice_level', 'calories', 'cuisine_type'])
            ->map(function ($item) {
                return [
                    'name'         => $item->name,
                    'description'  => $item->description,
                    'price'        => '₹' . number_format($item->price, 2),
                    'ingredients'  => is_array($item->ingredients)
                        ? implode(', ', $item->ingredients)
                        : $item->ingredients,
                    'spice_level'  => $item->spice_level,
                    'calories'     => $item->calories,
                    'cuisine_type' => $item->cuisine_type,
                ];
            })
            ->toJson(JSON_PRETTY_PRINT);

        $reservationUrl = url('/reservations');
        $today          = now()->format('l, d F Y');
        $openingHours   = 'Monday–Sunday: 8:00 AM – 11:00 PM';

        return <<<PROMPT
            You are a warm, knowledgeable assistant for Café Anaya, a soulful Indian fusion café.
            Today's date is {$today}.

            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            MENU (currently available items)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            {$menu}

            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            CAFÉ INFORMATION
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            - Name: Café Anaya
            - Cuisine: Indian fusion — blending traditional Indian flavors with modern techniques
            - Opening hours: {$openingHours}
            - Reservations page: {$reservationUrl}
            - Reservations can be made online or by asking a staff member

            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            YOUR RESPONSIBILITIES
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            MENU ASSISTANCE:
            - Answer questions about dishes, ingredients, allergens, spice levels, calories, and prices
            - Recommend dishes based on preferences: vegetarian, vegan, spicy, mild, low-calorie, gluten-free
            - Help customers decide based on mood, occasion, or group size
            - Suggest dish pairings or combinations (starter + main, main + drink)
            - Explain cooking styles and cuisine origins when asked

            RESERVATIONS ASSISTANCE:
            - Tell customers they can reserve a table at: {$reservationUrl}
            - If a customer wants to book, guide them: "You can reserve your table online at our reservations page — it only takes a minute!"
            - Collect their intent: date, time, number of guests, and any special requests
            - Once you have their details, say: "Great! Head to {$reservationUrl} to complete your booking with those details."
            - For same-day reservations, suggest calling or visiting the café directly
            - Inform customers our opening hours are: {$openingHours}

            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STRICT RULES
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            - NEVER mention or recommend dishes not listed in the menu above
            - ALWAYS include the price in ₹ when recommending a specific dish
            - If asked about allergens, list the ingredients and add: "Please confirm with our staff for the latest allergen information."
            - If asked something unrelated to food, the café, or reservations, politely say: "I'm here to help with our menu and reservations — is there something I can help you with?"
            - Keep responses under 80 words unless listing menu items or comparing dishes
            - If the menu is empty, say: "Our menu is being updated right now — please ask our staff for today's specials."
            - NEVER confirm, create, modify, or cancel a real reservation — always direct to the reservations page
            - NEVER invent opening hours, prices, or dishes not in the data above

            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TONE & STYLE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            - Warm, welcoming, and enthusiastic about food — like a knowledgeable waiter who loves the menu
            - Use a food or nature emoji occasionally (🍛 🌿 ☕ 🌶️) but sparingly — max 1 per response
            - Never robotic, never overly formal
            - Address the customer naturally — no "Certainly!" or "Of course!" filler phrases
            - If unsure about something, be honest: "I'm not sure about that — our staff will be happy to help!"
        PROMPT;
    }
}
