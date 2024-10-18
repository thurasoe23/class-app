<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateEnrollStudentRequest;
use App\Http\Requests\StoreEnrollStudentRequest;
use App\Models\Student;
use App\Models\Course;
use App\Models\Batch;
use App\Models\EnrollStudent;
use Inertia\Inertia;

class EnrollStudentController extends Controller
{
    public function index()
    {
        $enrollStudents = EnrollStudent::with(['student', 'course', 'batch'])->get();
        return Inertia::render('EnrollStudent/EnrollStudentTable', ['enrollStudents' => $enrollStudents]);
    }

    public function create()
    {
        $students = Student::all();
        $courses = Course::all();
        $batches = Batch::all();

        return Inertia::render('EnrollStudent/EnrollStudentCreateForm', [
            'students' => $students,
            'courses' => $courses,
            'batches' => $batches,
        ]);
    }

    public function store(StoreEnrollStudentRequest $request)
    {
        EnrollStudent::create($request->validated());
        return redirect()->route('enroll-students.index')->with('success', 'Student Course Batch created successfully!');
    }

    // public function show(EnrollStudent $studentCourseBatch)
    // {
    //     return Inertia::render('EnrollStudent/Show', ['studentCourseBatch' => $studentCourseBatch]);
    // }

    public function edit(EnrollStudent $enrollStudent)
    {
        $students = Student::all();
        $courses = Course::all();
        $batches = Batch::all();

        return Inertia::render('EnrollStudent/EnrollStudentEditForm', [
            'enroll_student' => $enrollStudent,
            'students' => $students,
            'courses' => $courses,
            'batches' => $batches,
        ]);
    }

    public function update(UpdateEnrollStudentRequest $request, EnrollStudent $enrollStudent)
    {
        $enrollStudent->update($request->validated());
        return redirect()->route('enroll-students.index')->with('success', 'Student Course Batch updated successfully!');
    }

    public function destroy(EnrollStudent $enrollStudent)
    {
        $enrollStudent->delete();
        return redirect()->route('enroll-students.index')->with('success', 'Student Course Batch deleted successfully!');
    }
}
