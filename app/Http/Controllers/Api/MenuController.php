<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Menu;
use App\Models\ViewedItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenuController extends Controller
{

    // ── Shared helper — maps a single Menu model to a translated array ──────
    private function transformMenu(Menu $menu): array
    {
        $locale = app()->getLocale();

        return [
            'id'                => $menu->id,
            'name'              => $menu->name,
            'description'       => $menu->description,
            'short_description' => $menu->short_description,
            'slug'              => $menu->slug,
            'price'             => $menu->price,
            'discount_price'    => $menu->discount_price,
            'image'             => $menu->image,
            'spice_level'       => $menu->spice_level,
            'calories'          => $menu->calories,
            'cuisine_type'      => $menu->cuisine_type,
            'cooking_style'     => $menu->cooking_style,
            'preparation_time'  => $menu->preparation_time,
            'rating'            => $menu->rating,
            'ingredients'       => $menu->ingredients,
            'is_available'      => $menu->is_available,
            'is_featured'       => $menu->is_featured,
            'signature'         => $menu->signature,
            'ai_generated'      => $menu->ai_generated,
            'category_id'       => $menu->category_id,
            'category'          => $menu->relationLoaded('category') ? $menu->category?->name : null,
        ];
    }


    public function categories()
    {
        return response()->json([
            'categories' => Category::select('id', 'name')->get()
        ]);
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
        $menu = Menu::with('category')->where('slug', $slug)->firstOrFail();

        ViewedItem::create([
            'user_id'    => Auth::id(),
            'session_id' => session()->getId(),
            'menu_id'    => $menu->id,
            'action'     => 'view',
        ]);

        $related = Menu::where('category_id', $menu->category_id)
            ->where('id', '!=', $menu->id)
            ->latest()->take(3)->get();

        $pairing = Menu::with('category')
            ->where('id', '!=', $menu->id)
            ->inRandomOrder()->take(3)->get();

        return Inertia::render('CafeMenuDetail', [
            'menu'    => $this->transformMenu($menu),
            'related' => $related->map(fn($m) => $this->transformMenu($m)),
            'pairing' => $pairing->map(fn($m) => $this->transformMenu($m)),
        ]);
    }
}
