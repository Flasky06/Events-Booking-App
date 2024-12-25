<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // Fetch all events
    public function index()
    {
        $events = Event::all();
        return response()->json($events, 200);
    }

    // Fetch a single event
    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event, 200);
    }

    // Create a new event
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'price' => 'required|numeric|min:0',
            'location_type' => 'required|in:physical,online',
            'link_url' => 'nullable|url',
            'image_url' => 'nullable|url',
            'tickets_available' => 'required|integer|min:0',
            'county' => 'nullable|string|max:255',
            'location_description' => 'nullable|string',
        ]);

        $validated['created_by'] = Auth::id();

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    // Update an event
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event || $event->created_by !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized or Event not found'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'start_datetime' => 'sometimes|required|date',
            'end_datetime' => 'sometimes|required|date|after:start_datetime',
            'price' => 'sometimes|required|numeric|min:0',
            'location_type' => 'sometimes|required|in:physical,online',
            'link_url' => 'nullable|url',
            'image_url' => 'nullable|url',
            'tickets_available' => 'sometimes|required|integer|min:0',
            'county' => 'nullable|string|max:255',
            'location_description' => 'nullable|string',
        ]);

        $event->update($validated);

        return response()->json($event, 200);
    }

    // Delete an event
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event || $event->created_by !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized or Event not found'], 403);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}