<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        return Inertia::render('Course/CourseTable', ['courses' => $courses]);
    }

    public function create()
    {
        return Inertia::render('Course/CourseCreateForm');
    }

    public function store(StoreCourseRequest $request)
    {
        Course::create($request->validated());
        return redirect()->route('courses.index')->with('success', 'Course created successfully');
    }

    public function show(Course $course)
    {
        return view('course.show', compact('course'));
    }

    public function edit(Course $course)
    {
        return Inertia::render('Course/CourseEditForm', ['course' => $course]);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return redirect()->route('courses.index')->with('success', 'Course updated successfully');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index')->with('success', 'Course deleted successfully');
    }
}
