<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Batch extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'course_id',
        'batch_identifier',
        'start_date',
        'end_date',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function studentCourseBatches()
    {
        return $this->hasMany(StudentCourseBatch::class);
    }

    public function assignments()
    {
        return $this->hasManyThrough(Assignment::class, StudentCourseBatch::class);
    }
}
