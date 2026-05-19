<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReservationAiService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ReservationAiController extends Controller
{
    public function __construct(protected ReservationAiService $aiService) {}

    public function parse(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|min:5|max:500',
        ]);

        $result = $this->aiService->parseReservation($request->message);

        return response()->json([
            'success'    => true,
            'data'       => $result,
            'message'    => $request->message,
        ]);
    }
}
