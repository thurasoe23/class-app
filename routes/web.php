<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentCourseBatchController;
use App\Models\Assignment;
use App\Models\Payment;
use App\Models\Student;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $totalStudents = Student::count();
    $totalAssignments = Assignment::count();
    $pendingAssignments = Assignment::where('status', 'pending')->count();
    $totalPaymentAmount = Payment::sum('amount');
    return Inertia::render('Dashboard', ['totalStudents' => $totalStudents, 'totalAssignments' => $totalAssignments, 'pendingAssignments' => $pendingAssignments, 'totalPaymentAmount' => $totalPaymentAmount]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('students', StudentController::class);
    Route::resource('courses', CourseController::class);
    Route::resource('batches', BatchController::class);
    Route::resource('student-course-batches', StudentCourseBatchController::class);

    Route::resource('assignments', AssignmentController::class);
    Route::post('/assignments/bulk-assign', [AssignmentController::class, 'bulkAssign'])->name('assignments.bulkAssign');

    Route::resource('attendances', AttendanceController::class);
    Route::post('/attendances/bulkAssign', [AttendanceController::class, 'bulkAssign'])->name('attendances.bulkAssign');

    Route::resource('payments', PaymentController::class);
});

require __DIR__ . '/auth.php';
