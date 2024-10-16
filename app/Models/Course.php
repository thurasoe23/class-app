<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'course_level',
        'course_fee',
    ];

    public function batches()
    {
        return $this->hasMany(Batch::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}
