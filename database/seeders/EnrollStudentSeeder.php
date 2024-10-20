<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EnrollStudent;

class EnrollStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        foreach (range(1, 20) as $studentId) {  // Loop through each student ID from 1 to 20
            EnrollStudent::create([
                'student_id' => $studentId,      // Assign the current student ID
                'course_id' => 1,                // You can also randomize this if needed
                'batch_id' => 1,                 // You can also randomize this if needed
                'enrollment_date' => now(),
                'status' => 'Enrolled',
            ]);
        }
    }
}
