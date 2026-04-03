<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function categories()
    {
        return Category::query()->select('id', 'name')->has('menus')->take(5)->get();
    }

    public function index(Request $request)
    {
        $query = Menu::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id)->latest()->take(6);
        }

        return $query->get();
    }
}
