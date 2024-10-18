<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attendance;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        foreach (range(1, 50) as $index) {
            Attendance::create([
                'enroll_student_id' => rand(1, 50), // Randomly assign student_course_batch IDs
                'date' => now()->subDays(rand(1, 30)), // Random date within the last 30 days
                'status' => rand(0, 1) ? 'Present' : 'Absent', // Randomly assign present or absent
            ]);
        }
    }
}
