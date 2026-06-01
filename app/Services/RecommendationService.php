<?php

namespace App\Services;

use App\Models\Menu;
use App\Models\ViewedItem;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecommendationService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    protected string $model   = 'llama-3.3-70b-versatile';

    public function __construct()
    {
        $this->apiKey = env('GROQ_API_KEY');
    }

    public function getRecommendations(?int $userId, string $sessionId): array
    {
        $cacheKey = $userId
            ? "recs:user:{$userId}"
            : "recs:session:{$sessionId}";

        return Cache::remember($cacheKey, now()->addHours(24), function () use ($userId, $sessionId) {
            return $this->generate($userId, $sessionId);
        });
    }

    public function clearCache(?int $userId, string $sessionId): void
    {
        $key = $userId
            ? "recs:user:{$userId}"
            : "recs:session:{$sessionId}";
        Cache::forget($key);
    }

    private function generate(?int $userId, string $sessionId): array
    {
        // Get viewed/ordered item IDs to exclude from recommendations
        $viewedIds = ViewedItem::when($userId,  fn($q) => $q->where('user_id',    $userId))
            ->when(!$userId, fn($q) => $q->where('session_id', $sessionId))
            ->pluck('menu_id')->unique()->toArray();

        // Build taste profile from history
        $history = ViewedItem::with('menu')
            ->when($userId,  fn($q) => $q->where('user_id',    $userId))
            ->when(!$userId, fn($q) => $q->where('session_id', $sessionId))
            ->latest()->take(15)->get()
            ->map(fn($v) => [
                'name'         => $v->menu?->name,
                'cuisine_type' => $v->menu?->cuisine_type,
                'spice_level'  => $v->menu?->spice_level,
                'action'       => $v->action,
            ])
            ->filter(fn($v) => $v['name'])
            ->values()->toArray();

        // Available menu items (not yet seen)
        $available = Menu::where('is_available', true)
            ->whereNotIn('id', $viewedIds)
            ->get(['id', 'name', 'description', 'price', 'cuisine_type', 'spice_level', 'calories', 'is_featured'])
            ->toArray();

        // No items available → return featured dishes
        if (empty($available)) {
            return $this->getFeatured();
        }

        // No history → return featured dishes
        if (empty($history)) {
            return $this->getFeatured();
        }

        return $this->askGroq($history, $available);
    }

    private function askGroq(array $history, array $available): array
    {
        $historyJson   = json_encode($history);
        $availableJson = json_encode($available);

        $prompt = "You are a food recommendation engine for Café Anaya, an Indian fusion café.

        Customer browsing history (most recent first):
        {$historyJson}

        Menu items available (not yet seen by customer):
        {$availableJson}

        Based on the customer's taste profile, recommend exactly 3 dishes.
        Return ONLY a valid JSON array — no markdown, no backticks, no explanation:
        [
        {
            \"menu_id\": 1,
            \"reason\": \"One warm sentence why they will love this. Max 12 words.\"
        }
        ]

        Rules:
        - Match spice preference and cuisine style from their history
        - Vary picks — do not pick 3 of the same cuisine type
        - Only use menu_id values from the available list above
        - reason must feel personal, warm, and food-enthusiastic
        - If history shows they prefer mild dishes, avoid recommending Hot/Extra Hot items";

        try {
            $response = Http::timeout(20)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type'  => 'application/json',
                ])
                ->post($this->baseUrl, [
                    'model'       => $this->model,
                    'messages'    => [
                        ['role' => 'system', 'content' => 'You are a restaurant recommendation engine. Return valid JSON array only. No markdown.'],
                        ['role' => 'user',   'content' => $prompt],
                    ],
                    'max_tokens'  => 300,
                    'temperature' => 0.6,
                ]);

            if ($response->failed()) {
                Log::error('RecommendationService Groq failed', [
                    'status' => $response->status(),
                    'body'   => $response->json(),
                ]);
                return $this->getFeatured();
            }

            $raw  = $response->json('choices.0.message.content', '');
            $raw  = preg_replace('/```json|```/i', '', $raw);
            $recs = json_decode(trim($raw), true);

            if (json_last_error() !== JSON_ERROR_NONE || !is_array($recs)) {
                Log::error('RecommendationService JSON parse failed', ['raw' => $raw]);
                return $this->getFeatured();
            }

            // Hydrate with full menu data
            return collect($recs)
                ->map(function ($rec) {
                    $item = Menu::find($rec['menu_id']);
                    if (!$item) return null;
                    return [
                        'id'          => $item->id,
                        'name'        => $item->name,
                        'description' => $item->description,
                        'price'       => $item->price,
                        'image'       => $item->image,
                        'slug'        => $item->slug,
                        'spice_level' => $item->spice_level,
                        'cuisine_type' => $item->cuisine_type,
                        'reason'      => $rec['reason'],
                        'ai_picked'   => true,
                    ];
                })
                ->filter()
                ->values()
                ->toArray();
        } catch (\Exception $e) {
            Log::error('RecommendationService error: ' . $e->getMessage());
            return $this->getFeatured();
        }
    }

    private function getFeatured(): array
    {
        return Menu::where('is_available', true)
            ->where('is_featured', true)
            ->take(3)
            ->get()
            ->map(fn($item) => [
                'id'          => $item->id,
                'name'        => $item->name,
                'description' => $item->description,
                'price'       => $item->price,
                'image'       => $item->image,
                'slug'        => $item->slug,
                'spice_level' => $item->spice_level,
                'cuisine_type' => $item->cuisine_type,
                'reason'      => 'One of our most loved dishes.',
                'ai_picked'   => false,
            ])
            ->toArray();
    }
}
