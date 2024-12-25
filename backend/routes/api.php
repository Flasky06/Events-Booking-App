<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {

    Route::post('register','register');
    Route::post('login','login');

    Route::get('user','userProfile')->middleware('auth:sanctum');

    Route::get('logout','userLogout')->middleware('auth:sanctum');

});



Route::get('/events', [EventController::class, 'index']); // List all events
Route::get('/events/{id}', [EventController::class, 'show']); // View a single event

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/events', [EventController::class, 'store']); // Create an event
    Route::put('/events/{id}', [EventController::class, 'update']); // Update an event
    Route::delete('/events/{id}', [EventController::class, 'destroy']); // Delete an event
});