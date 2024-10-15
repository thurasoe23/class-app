<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status', 'all');

        $students = Student::with('courses')
            ->when($status !== 'all', function ($query) use ($status) {
                $query->whereHas('courses', function ($q) use ($status) {
                    $q->where('status', $status);
                });
            })
            ->get();

        return Inertia::render('Student/StudentTable', ['students' => $students, 'status' => $status]);
    }

    public function create()
    {
        $courses = Course::all();
        return Inertia::render('Student/StudentCreateForm', ['courses' => $courses]);
    }

    public function store(StoreStudentRequest $request)
    {
        $request->validated();

        $student = Student::create($request->only([
            'name',
            'phone_number',
            'email',
            'gender',
            'city',
            'telegram_username',
            'facebook_username',
        ]));

        $student->courses()->attach($request->course_id, ['status' => $request->status]);

        return redirect()->route('students.index')->with('success', 'Student created successfully!');
    }

    public function show(Student $student)
    {
        return view('students.show', compact('student'));
    }

    public function edit(Student $student)
    {
        $student->load('courses');
        $courses = Course::all();
        return Inertia::render('Student/StudentEditForm', [
            'student' => $student,
            'courses' => $courses,
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        $student->courses()->detach();

        if ($request->course_id) {
            $student->courses()->attach($request->course_id, ['status' => $request->status]);
        }

        return redirect()->route('students.index')->with('success', 'Student updated successfully!');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully!');
    }
}
