<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttendanceRequest; // Create this request
use App\Models\Attendance;
use App\Models\Batch;
use App\Models\Course;
use App\Models\EnrollStudent;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the attendances.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $attendances = Attendance::with(['enrollStudent.student', 'enrollStudent.batch', 'enrollStudent.course'])->get();

        return Inertia::render('Attendance/AttendanceTable', [
            'attendances' => $attendances,
        ]);
    }

    /**
     * Show the form for creating a new attendance.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Attendance/AttendanceCreateForm', [
            'courses' => Course::all(),  // Fetch all courses for selection
            'batches' => Batch::all(),   // Fetch all batches for selection
            'enrollStudents' => EnrollStudent::with(['student', 'batch', 'course'])->get(),
        ]);
    }

    /**
     * Store a newly created attendance in storage.
     *
     * @param  \App\Http\Requests\StoreAttendanceRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreAttendanceRequest $request)
    {
        Attendance::create($request->validated());

        return redirect()->route('attendances.index')->with('success', 'Attendance recorded successfully');
    }

    /**
     * Bulk assign attendance for selected students.
     *
     * @param  \App\Http\Requests\StoreAttendanceRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bulkAssign(StoreAttendanceRequest $request)
    {
        $validated = $request->validated(); // Get the validated data

        foreach ($validated['selected_students'] as $studentId) {
            $enrollStudent = EnrollStudent::where('student_id', $studentId)
                ->where('course_id', $validated['course_id'])
                ->where('batch_id', $validated['batch_id'])
                ->first();

            if ($enrollStudent) {
                Attendance::create([
                    'enroll_student_id' => $enrollStudent->id,
                    'date' => $validated['date'], // Assuming you pass date in request
                    'status' => $validated['status'],
                ]);
            }
        }

        return redirect()->route('attendances.index')->with('success', 'Attendances recorded successfully.');
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->route('attendances.index')->with('success', 'Attendances deleted successfully');
    }
}
