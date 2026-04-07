<?php

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

