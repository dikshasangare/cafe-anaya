<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/menu', function () {
    return response()->json([
        [
            'id' => 1,
            'name' => 'Cappuccino',
            'price' => 120,
            'image' => 'https://images.unsplash.com/photo-1511920170033-f8396924c348'
        ],
        [
            'id' => 2,
            'name' => 'Cold Coffee',
            'price' => 150,
            'image' => 'https://images.unsplash.com/photo-1498804103079-a6351b050096'
        ],
        [
            'id' => 3,
            'name' => 'Chocolate Croissant',
            'price' => 180,
            'image' => 'https://images.unsplash.com/photo-1586985564150-1e3fbaeb3d4b'
        ]
    ]);
});
