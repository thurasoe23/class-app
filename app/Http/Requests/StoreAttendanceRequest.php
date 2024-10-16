<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'course_id' => 'required|exists:courses,id',
            'batch_id' => 'required|exists:batches,id',
            'date' => 'required|date', // Ensure date is provided
            'status' => 'required|string|in:Present,Absent',
            'selected_students' => 'required|array', // Validate that selected_students is an array
            'selected_students.*' => 'exists:students,id',
        ];
    }
}
