<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
  // Fetch paginated events
public function index()
{
    $events = Event::paginate(9);
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

    // Fetch events created by the authenticated user
    public function myEvents()
    {
        $userId = Auth::id();

        $events = Event::where('created_by', $userId)->paginate(6);

        return response()->json($events, 200);
    }


    // Create a new event
public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'price' => 'required|numeric|min:0',
            'location_type' => 'required|in:physical,online',
            'link_url' => 'nullable|url',
            'image' => 'nullable|file|image|max:2048',
            'tickets_available' => 'required|integer|min:0',
            'county' => 'nullable|in:Nairobi,Nakuru,Kiambu,Machakos,Mombasa,Kisumu,Nyeri',
            'location_description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validated['image_url'] = asset("storage/{$imagePath}");
        }

        $validated['created_by'] = Auth::id();

        $event = Event::create($validated);

        return response()->json($event, 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
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