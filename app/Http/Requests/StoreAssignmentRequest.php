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
            'course_id' => 'required|exists:courses,id',
            'batch_id' => 'required|exists:batches,id',
            'task' => 'required|string|max:255',
            'status' => 'required|string|in:Pending,Done,Failed',
            'selected_students' => 'required|array', // Validate that selected_students is an array
            'selected_students.*' => 'exists:students,id',
        ];
    }
}
