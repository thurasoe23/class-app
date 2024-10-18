<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        foreach (range(1, 50) as $index) {
            Assignment::create([
                'student_course_batch_id' => rand(1, 50), // Randomly assign student_course_batch IDs
                'task' => 'Complete Assignment ' . $index,
                'status' => 'Pending',
            ]);
        }
    }
}
