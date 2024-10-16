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
        'student_course_batch_id',
        'amount',
    ];

    public function studentCourseBatch()
    {
        return $this->belongsTo(StudentCourseBatch::class); // Updated relationship
    }
}
