<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Thura',
            'email' => 'thura@gmail.com',
        ]);

        $this->call([
            StudentSeeder::class,
            CourseSeeder::class,
            BatchSeeder::class,
            EnrollStudentSeeder::class,
            AssignmentSeeder::class,
            AttendanceSeeder::class,
        ]);
    }
}
