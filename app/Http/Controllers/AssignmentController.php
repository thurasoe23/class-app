<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\Assignment;
use App\Models\Batch;
use App\Models\Course;
use App\Models\Student;
use App\Models\StudentCourseBatch;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the assignments.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $assignments = Assignment::with(['studentCourseBatch.student', 'studentCourseBatch.batch', 'studentCourseBatch.course'])->get();

        return Inertia::render('Assignment/AssignmentTable', [
            'assignments' => $assignments,
        ]);
    }

    /**
     * Show the form for creating a new assignment.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Assignment/AssignmentCreateForm', [
            'studentCourseBatches' => StudentCourseBatch::with(['student', 'batch', 'course'])->get(),
        ]);
    }

    /**
     * Store a newly created assignment in storage.
     *
     * @param  \App\Http\Requests\StoreAssignmentRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreAssignmentRequest $request)
    {
        Assignment::create($request->validated());

        return redirect()->route('assignments.index')->with('success', 'Assignment created successfully');
    }

    /**
     * Display the specified assignment.
     *
     * @param  Assignment  $assignment
     * @return \Illuminate\View\View
     */
    public function show(Assignment $assignment)
    {
        return view('assignments.show', compact('assignment'));
    }

    /**
     * Show the form for editing the specified assignment.
     *
     * @param  Assignment  $assignment
     * @return \Inertia\Response
     */
    public function edit(Assignment $assignment)
    {
        // Load all necessary data for the edit form
        $studentCourseBatches = StudentCourseBatch::with(['student', 'batch', 'course'])->get();

        return Inertia::render('Assignment/AssignmentEditForm', [
            'studentCourseBatches' => $studentCourseBatches,
            'assignment' => $assignment->load('studentCourseBatch.student', 'studentCourseBatch.batch', 'studentCourseBatch.course'),
        ]);
    }

    /**
     * Update the specified assignment in storage.
     *
     * @param  \App\Http\Requests\UpdateAssignmentRequest  $request
     * @param  Assignment  $assignment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $assignment->update($request->validated());

        return redirect()->route('assignments.index')->with('success', 'Assignment updated successfully');
    }

    /**
     * Remove the specified assignment from storage.
     *
     * @param  Assignment  $assignment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return redirect()->route('assignments.index')->with('success', 'Assignment deleted successfully');
    }
}
