<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('category');
            $table->timestamp('start_datetime');
            $table->timestamp('end_datetime');
            $table->decimal('price', 10);
            $table->enum('location_type', ['physical', 'online']);
            $table->string('link_url')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('tickets_available');
            $table->string('county')->nullable();
            $table->text('location_description')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};