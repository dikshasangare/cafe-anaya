<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RecommendationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecommendationController extends Controller
{
    public function __construct(protected RecommendationService $service) {}

    public function index(Request $request): JsonResponse
    {
        $sessionId = $request->header('X-Session-ID')
            ?? $request->cookie('XSRF-TOKEN')
            ?? $request->ip();

        $recs = $this->service->getRecommendations(
            Auth::id(),
            $sessionId
        );

        return response()->json([
            'success' => true,
            'data'    => $recs,
        ]);
    }
}
