<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatSession;
use App\Services\ChatbotService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function __construct(protected ChatbotService $chatbot) {}

    public function send(Request $request): JsonResponse
    {
        $request->validate([
            'message'    => 'required|string|max:500',
            'session_id' => 'nullable|string',
        ]);

        // Get or create session
        $session = ChatSession::firstOrCreate(
            ['session_id' => $request->session_id ?? Str::uuid()],
            ['user_id'    => Auth::id()]
        );

        // Load last 10 messages for context (keeps token usage low)
        $history = $session->messages()
            ->latest()
            ->take(10)
            ->get()
            ->reverse()
            ->map(fn($m) => ['role' => $m->role, 'content' => $m->content])
            ->values()
            ->toArray();

        // Save user message
        $session->messages()->create([
            'role'    => 'user',
            'content' => $request->message,
        ]);

        // Get AI response
        $reply = $this->chatbot->chat($history, $request->message);

        // Save assistant reply
        $session->messages()->create([
            'role'    => 'assistant',
            'content' => $reply,
        ]);

        return response()->json([
            'reply'      => $reply,
            'session_id' => $session->session_id,
        ]);
    }
}
