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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assignment = Assignment::with(['student', 'batch', 'course'])->get();
        return Inertia::render('Assignment/AssignmentTable', ['assignments' => $assignment]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $courses = Course::all(); // Fetch all courses
        $batches = Batch::all();
        $students = Student::all();
        return Inertia::render('Assignment/AssignmentCreateForm', [
            'courses' => $courses, 'batches' => $batches, 'students' => $students // Pass courses to the component
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentRequest $request)
    {
        Assignment::create($request->validated());
        return redirect()->route('assignments.index')->with('success', 'Assignment created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Assignment $assignment)
    {
        return view('assignments.show', compact('assignment'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assignment $assignment)
    {
        $students = Student::all();
        $courses = Course::all();
        $batches = Batch::all();

        $assignment->load('student', 'batch', 'course');
        return Inertia::render('Assignment/AssignmentEditForm', ['student' => $students,'batch' => $batches, 'course' => $courses, 'assignment' => $assignment]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $assignment->update($request->validated());
        return redirect()->route('assignments.index')->with('success', 'Assignment updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->delete();
        return redirect()->route('assignments.index')->with('success', 'Assignment deleted successfully');
    }
}
