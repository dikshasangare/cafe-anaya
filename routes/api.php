<?php

use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\Admin\ReservationAiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\TranslationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


Route::get('/categories', [MenuController::class, 'categories']);

// for home page
Route::get('/home-categories', [MenuController::class, 'homeCategories']);

Route::get('/menu', [MenuController::class, 'index']);

Route::post('/reservations', [ReservationController::class, 'store']);

Route::get('/reservations', [ReservationController::class, 'index']);

Route::get('/reservations/{id}', [ReservationController::class, 'show']);

Route::put('/reservations/{id}', [ReservationController::class, 'update']);

Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);


Route::post('/chat', [ChatController::class, 'send'])
    ->middleware('throttle:20,1') // 20 requests per minute per IP
    ->name('chat.send');


Route::post('/reservations/parse', [ReservationAiController::class, 'parse'])
    ->middleware('throttle:10,1') // 10 requests per minute per IP
    ->name('reservations.parse');




Route::post('/translate-page', [TranslationController::class, 'translate']);
// Route::post('/translate-page', function (Request $request) {

//     $texts = $request->texts;
//     $locale = $request->locale;
//     dd($texts, $locale);
//     if (!$texts || $locale === 'en') {
//         return response()->json([
//             'translations' => $texts
//         ]);
//     }

//     try {
//         $prompt = " Translate this JSON array into {$locale}.
//         Return ONLY valid JSON array.
//         JSON: " . json_encode($texts);

//         $response = Http::withHeaders([
//             'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
//             'Content-Type' => 'application/json',
//         ])->timeout(60)->post(
//             'https://api.groq.com/openai/v1/chat/completions',
//             [
//                 'model' => 'llama-3.3-70b-versatile',
//                 'messages' => [
//                     [
//                         'role' => 'system',
//                         'content' => 'Return ONLY JSON array.'
//                     ],
//                     [
//                         'role' => 'user',
//                         'content' => $prompt
//                     ]
//                 ],
//                 'temperature' => 0.2,
//             ]
//         );

//         $content = $response->json(
//             'choices.0.message.content'
//         );

//         $translations = json_decode($content, true);
//         dd($translations);
//         return response()->json([
//             'translations' => $translations
//         ]);
//     } catch (\Exception $e) {

//         return response()->json([
//             'translations' => $texts
//         ]);
//     }
// });
