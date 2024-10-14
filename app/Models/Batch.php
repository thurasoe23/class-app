<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'course_id',
        'batch_identifier',
        'start_date',
        'end_date',
    ];

    // Define relationship to Course model
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}
