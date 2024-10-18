<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $courses = [
            ['name' => 'Mathematics', 'course_level' => 'Beginner', 'course_fee' => 100],
            ['name' => 'Science', 'course_level' => 'Intermediate', 'course_fee' => 150],
            ['name' => 'History', 'course_level' => 'Advanced', 'course_fee' => 200],
            ['name' => 'Literature', 'course_level' => 'Beginner', 'course_fee' => 120],
            ['name' => 'Computer Science', 'course_level' => 'Intermediate', 'course_fee' => 250],
            // Add more unique courses as needed
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
