<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAssignmentRequest extends FormRequest
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
            'enroll_student_id' => 'nullable|exists:enroll_students,id', // Update this line
            'task' => 'nullable|string|max:255', // Allow task to be optional for updates
            'status' => 'nullable|string|in:Pending,Done,Failed', // Allow status to be optional for updates
        ];
    }
}
