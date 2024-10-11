<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\Assignment;
use PHPUnit\Framework\MockObject\ReturnValueNotConfiguredException;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assignment = Assignment::all();
        return view('assignments.index', compact('assignment'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('assignments.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentRequest $request)
    {
        Assignment::create($request->all());
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
        return view('assignments.edit', compact('assignment'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $assignment->update($request->all());
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
