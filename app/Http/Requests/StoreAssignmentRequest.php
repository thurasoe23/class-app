<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAssignmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_course_batch_id' => 'required|exists:student_course_batches,id', // Update this line
            'task' => 'required|string|max:255', // Add task validation
            'status' => 'required|string|in:Pending,Done,Failed', // Ensure status is one of the allowed values
        ];
    }
}
