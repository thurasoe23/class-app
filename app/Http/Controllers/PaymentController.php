<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\Course;
use App\Models\Payment;
use App\Models\Student;
use Inertia\Inertia;

class PaymentController extends Controller
{

    public function index()
    {
        $payment = Payment::with(['student', 'course'])->get();
        return Inertia::render('Payment/PaymentTable', ['payments' => $payment]);
    }

    public function create()
    {   
        $students = Student::all();
        $courses = Course::all();
        return Inertia::render('Payment/PaymentCreateForm', ['students' => $students, 'courses' => $courses]);
    }

    public function store(StorePaymentRequest $request)
    {
        Payment::create($request->validated());
        return redirect()->route('payments.index')->with('success', 'Payment created successfully!');
    }

    public function show(Payment $payment)
    {
        return view('payments.show', compact('payment'));
    }

    public function edit(Payment $payment)
    {
        return view('payments.edit', compact('payment'));
    }

    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $payment->update($request->all());
        return redirect()->route('payments.index')->with('success', 'Payment updated successfully!');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index')->with('success', 'Payment deleted successfully!');
    }
}
