<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->text,
            'description' => $this->faker->paragraph,
            'category' => $this->faker->randomElement(['Music', 'Tech', 'Education']),
            'start_datetime' => $this->faker->dateTimeBetween('+1 day', '+1 week'),
            'end_datetime' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'price' => $this->faker->randomFloat(2, 0, 100),
            'location_type' => $this->faker->randomElement(['physical', 'online']),
            'link_url' => $this->faker->url,
            'image_url' => $this->faker->imageUrl,
            'tickets_available' => $this->faker->numberBetween(10, 100),
            'county' => $this->faker->city,
            'location_description' => $this->faker->address,
            'created_by' => 1,
        ];
    }
}