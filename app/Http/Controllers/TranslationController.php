<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslationController extends Controller
{
    public function translate(Request $request)
    {
        $request->validate([
            'text'   => 'required|string',
            'locale' => 'required|string',
        ]);

        $text   = $request->text;
        $locale = $request->locale;

        // Skip English (no need to translate)
        if ($locale === 'en') {
            return response()->json([
                'translated' => $text
            ]);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
                'Content-Type'  => 'application/json',
            ])->timeout(30)->post(
                'https://api.groq.com/openai/v1/chat/completions',
                [
                    'model' => 'llama-3.3-70b-versatile',
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' =>
                            'You are a professional translator. ' .
                                'Translate the text accurately into the target language. ' .
                                'Return ONLY translated text. No explanation. No quotes.'
                        ],
                        [
                            'role' => 'user',
                            'content' => "Translate this into {$locale}:\n\n{$text}"
                        ],
                    ],
                    'temperature' => 0.2,
                    'max_tokens' => 500,
                ]
            );

            if ($response->failed()) {
                Log::error('Translation API failed', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);

                return response()->json([
                    'translated' => $text
                ]);
            }

            $data = $response->json();

            $translated =
                $data['choices'][0]['message']['content']
                ?? $text;

            return response()->json([
                'translated' => trim($translated)
            ]);
        } catch (\Exception $e) {
            Log::error('Translation Exception: ' . $e->getMessage());

            return response()->json([
                'translated' => $text
            ]);
        }
    }
}
