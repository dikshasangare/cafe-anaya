<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Menu extends Model
{
    use HasTranslations;
    
    // public array $translatable = ['name', 'description', 'short_description'];

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
        'signature',
        'ingredients',
        'cooking_style',
        'calories',
        'cuisine_type',
        'spice_level',
        'short_description',
        'ai_generated'
    ];

    protected $casts = [
        'tags' => 'array',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'ingredients' => 'array',
        'ai_generated' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null; // Or a default placeholder URL
        }

        // This converts 'photos/my-img.jpg' to 'http://cafe-anaya.test/storage/photos/my-img.jpg'
        return asset('storage/' . $this->image);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(MenuImage::class);
    }
}
