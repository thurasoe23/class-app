<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assignment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'student_course_batch_id',
        'task',
        'status',
    ];

    public function studentCourseBatch()
    {
        return $this->belongsTo(StudentCourseBatch::class);
    }
}
