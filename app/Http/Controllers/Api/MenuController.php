<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function categories()
    {
        return response()->json([
            'categories' => Category::select('id', 'name')->get()
        ]);

        // return Category::query()->select('id', 'name')->has('menus')->take(5)->get();
    }

    public function index(Request $request)
    {
        $query = Menu::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id)->latest()->take(6);
        }

        $menu = $query->get();

        return response()->json([
            'menus' => $menu
        ]);
    }

    public function homeCategories()
    {
        return response()->json([
            'categories' => Category::select('id', 'name')->take(5)->get()
        ]);
    }

    public function show($slug)
    {
        $menu = Menu::with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Menu::where('category_id', $menu->category_id)
            ->where('id', '!=', $menu->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('CafeMenuDetail', [
            'menu' => $menu,
            'related' => $related,
        ]);
    }
}
