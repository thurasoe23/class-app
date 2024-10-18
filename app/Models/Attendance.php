<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'enroll_student_id',
        'date',
        'status',
    ];

    public function enrollStudent()
    {
        return $this->belongsTo(EnrollStudent::class);
    }
}
