<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'enroll_student_id',
        'amount',
    ];

    public function enrollStudents()
    {
        return $this->belongsTo(EnrollStudent::class); // Updated relationship
    }
}
