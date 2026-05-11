<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Reservation List
     */
    public function index()
    {
        $reservations = Reservation::latest()->paginate(10);
        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    /**
     * Store Reservation
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'guests' => 'required',
            'name' => 'required|max:255',
            'phone' => ['required', 'regex:/^[6-9]\d{9}$/'],
            'notes' => 'nullable|max:1000',
        ]);

        if ($request->date < now()->format('Y-m-d')) {
            return response()->json([
                'success' => false,
                'message' => 'Past dates are not allowed.'
            ], 422);
        }

        $existingReservations = Reservation::whereDate('date', $request->date)
            ->where('time', $request->time)
            ->count();

        if ($existingReservations >= 10) {
            return response()->json([
                'success' => false,
                'message' => 'Selected time slot is fully booked.'
            ], 422);
        }

        $reservation = Reservation::create([
            'date' => $request->date,
            'time' => $request->time,
            'guests' => $request->guests,
            'name' => $request->name,
            'phone' => $request->phone,
            'notes' => $request->notes,
            'status' => 'confirmed',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reservation created successfully.',
            'data' => $reservation
        ]);
    }

    /**
     * Single Reservation
     */
    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $reservation
        ]);
    }

    /**
     * Update Reservation
     */
    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed,no_show'
        ]);

        $reservation->update([
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reservation updated successfully.',
            'data' => $reservation
        ]);
    }

    /**
     * Delete Reservation
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);

        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reservation deleted successfully.'
        ]);
    }
}
