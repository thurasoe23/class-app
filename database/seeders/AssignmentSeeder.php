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
        foreach (range(1, 20) as $index) {
            Assignment::create([
                'enroll_student_id' => rand(1, 20), // Randomly assign student_course_batch IDs
                'task' => 'Complete Assignment ' . $index,
                'status' => 'Pending',
            ]);
        }
    }
}
