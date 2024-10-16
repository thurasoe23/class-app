<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'students';

    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'gender',
        'city',
        'telegram_username',
    ];

    protected $dates = ['deleted_at'];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function studentCourseBatches()
    {
        return $this->hasMany(StudentCourseBatch::class);
    }

    public function assignments()
    {
        return $this->hasManyThrough(Assignment::class, StudentCourseBatch::class);
    }

    // public function courseHistory()
    // {
    //     return $this->hasMany(CourseHistory::class);
    // }
}
