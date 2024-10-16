<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentCourseBatchRequest;
use App\Http\Requests\UpdateStudentCourseBatchRequest;
use App\Models\StudentCourseBatch;
use App\Models\Student;
use App\Models\Course;
use App\Models\Batch;
use Inertia\Inertia;

class StudentCourseBatchController extends Controller
{
    public function index()
    {
        $studentCourseBatches = StudentCourseBatch::with(['student', 'course', 'batch'])->get();
        return Inertia::render('StudentCourseBatch/StudentCourseBatchTable', ['studentCourseBatches' => $studentCourseBatches]);
    }

    public function create()
    {
        $students = Student::all();
        $courses = Course::all();
        $batches = Batch::all();

        return Inertia::render('StudentCourseBatch/StudentCourseBatchCreate', [
            'students' => $students,
            'courses' => $courses,
            'batches' => $batches,
        ]);
    }

    public function store(StoreStudentCourseBatchRequest $request)
    {
        StudentCourseBatch::create($request->validated());
        return redirect()->route('student-course-batches.index')->with('success', 'Student Course Batch created successfully!');
    }

    public function show(StudentCourseBatch $studentCourseBatch)
    {
        return Inertia::render('StudentCourseBatch/Show', ['studentCourseBatch' => $studentCourseBatch]);
    }

    public function edit(StudentCourseBatch $studentCourseBatch)
    {
        $students = Student::all();
        $courses = Course::all();
        $batches = Batch::all();

        return Inertia::render('StudentCourseBatch/Edit', [
            'studentCourseBatch' => $studentCourseBatch,
            'students' => $students,
            'courses' => $courses,
            'batches' => $batches,
        ]);
    }

    public function update(UpdateStudentCourseBatchRequest $request, StudentCourseBatch $studentCourseBatch)
    {
        $studentCourseBatch->update($request->validated());
        return redirect()->route('student-course-batches.index')->with('success', 'Student Course Batch updated successfully!');
    }

    public function destroy(StudentCourseBatch $studentCourseBatch)
    {
        $studentCourseBatch->delete();
        return redirect()->route('student-course-batches.index')->with('success', 'Student Course Batch deleted successfully!');
    }
}
