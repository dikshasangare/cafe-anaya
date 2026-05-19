<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'date',
        'time',
        'guests',
        'name',
        'phone',
        'notes',
        'status',
        'party_size',
        'special_requests',
        'original_request',  // add
        'ai_extracted',      // add
    ];

    protected $casts = [
        'ai_extracted' => 'boolean',
        'date'         => 'date',
    ];
}
