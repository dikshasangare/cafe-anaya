<?php

use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\Admin\ReservationAiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\ReservationController;

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
