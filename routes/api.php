<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;


Route::get('/categories', [MenuController::class, 'categories']);

Route::get('/menu', [MenuController::class, 'index']);