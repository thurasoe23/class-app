<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBatchRequest;
use App\Http\Requests\UpdateBatchRequest;
use App\Models\Batch;
use App\Models\Course;
use Inertia\Inertia;

class BatchController extends Controller
{
    public function index()
    {
        $batch = Batch::with('course')->get();
        return Inertia::render('Batch/BatchTable', ['batches' => $batch]);
    }

    public function create()
    {
        $courses = Course::all();
        return Inertia::render('Batch/BatchCreateForm', [
            'courses' => $courses,
        ]);
    }

    public function store(StoreBatchRequest $request)
    {
        Batch::create($request->validated());
        return redirect()->route('batches.index')->with('success', 'Batch created successfully!');
    }

    public function show(Batch $batch)
    {
        return view('batches.show', compact('batch'));
    }

    public function edit(Batch $batch)
    {
        $courses = Course::all();
        return Inertia::render('Batch/BatchEditForm', ['batch' => $batch, 'course' => $courses]);
    }

    public function update(UpdateBatchRequest $request, Batch $batch)
    {
        $batch->update($request->validated());
        return redirect()->route('batches.index')->with('success', 'Batch updated successfully!');
    }

    public function destroy(Batch $batch)
    {
        $batch->delete();
        return redirect()->route('batches.index')->with('success', 'Batch deleted successfully!');
    }
}
