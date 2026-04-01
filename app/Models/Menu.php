<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'price',
        'discount_price',
        'image',
        'description',
        'category_id',
        'is_available',
        'is_featured',
        'preparation_time',
        'rating',
        'tags'
    ];

    protected $casts = [
        'tags' => 'array',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(MenuImage::class);
    }

}
