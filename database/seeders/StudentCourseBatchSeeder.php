<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudentCourseBatch;

class StudentCourseBatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        foreach (range(1, 50) as $index) {
            StudentCourseBatch::create([
                'student_id' => rand(1, 50), // Randomly assign student IDs
                'course_id' => rand(1, 5),   // Randomly assign course IDs
                'batch_id' => rand(1, 10),    // Randomly assign batch IDs
                'enrollment_date' => now(),
                'status' => 'Enrolled',
            ]);
        }
    }
}
