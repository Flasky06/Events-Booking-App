<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'start_datetime',
        'end_datetime',
        'price',
        'location_type',
        'link_url',
        'image_url',
        'tickets_available',
        'county',
        'location_description',
        'created_by',
    ];

    // Define relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
