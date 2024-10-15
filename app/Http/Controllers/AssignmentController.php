<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\Assignment;
use App\Models\Batch;
use App\Models\Course;
use App\Models\Student;
use PHPUnit\Framework\MockObject\ReturnValueNotConfiguredException;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function index()
    {
        $assignment = Assignment::with(['student', 'batch', 'course'])->get();
        return Inertia::render('Assignment/AssignmentTable', ['assignments' => $assignment]);
    }

    public function create()
    {
        $courses = Course::all();
        $batches = Batch::all();
        $students = Student::all();
        return Inertia::render('Assignment/AssignmentCreateForm', [
            'courses' => $courses, 'batches' => $batches, 'students' => $students
        ]);
    }

    public function store(StoreAssignmentRequest $request)
    {
        Assignment::create($request->validated());
        return redirect()->route('assignments.index')->with('success', 'Assignment created successfully');
    }

    public function show(Assignment $assignment)
    {
        return view('assignments.show', compact('assignment'));
    }

    public function edit(Assignment $assignment)
    {
        $students = Student::all();
        $courses = Course::all();
        $batches = Batch::all();

        $assignment->load('student', 'batch', 'course');
        return Inertia::render('Assignment/AssignmentEditForm', ['student' => $students,'batch' => $batches, 'course' => $courses, 'assignment' => $assignment]);
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $assignment->update($request->validated());
        return redirect()->route('assignments.index')->with('success', 'Assignment updated successfully');
    }

    public function destroy(Assignment $assignment)
    {
        $assignment->delete();
        return redirect()->route('assignments.index')->with('success', 'Assignment deleted successfully');
    }
}
