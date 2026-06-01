<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewedItem extends Model
{
    protected $fillable = ['user_id', 'session_id', 'menu_id', 'action'];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
