<?php

use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\RecommendationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('app');
// });

Route::get('/', function () {
    return Inertia::render('Home'); // Looks for resources/js/Pages/Home.jsx
});


Route::get('/our-story', function () {
    return Inertia::render('OurStoryPage'); // This looks for OurStoryPage.jsx in resources/js/Pages
})->name('our-story');

Route::get('/reservations', function () {
    return Inertia::render('Reservation');
})->name('reservations');

Route::get('/cafe-gallery', function () {
    return Inertia::render('CafeGallery');
})->name('cafe-gallery');

Route::get('/cafe-menus', function () {
    return Inertia::render('CafeMenu');
})->name('cafe-menus');

Route::get('/cafe-menu/{slug}', [MenuController::class, 'show']);

Route::get('/cafe-events', function () {
    return Inertia::render('CafeEvents');
})->name('cafe-events');

Route::get('/api/recommendations', [RecommendationController::class, 'index'])->middleware('throttle:10,1')->name('recommendations.index');
