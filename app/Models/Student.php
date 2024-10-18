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
        return $this->hasManyThrough(Payment::class, EnrollStudent::class);
    }

    public function enrollStudents()
    {
        return $this->hasMany(EnrollStudent::class);
    }

    public function assignments()
    {
        return $this->hasManyThrough(Assignment::class, EnrollStudent::class);
    }

    // public function courseHistory()
    // {
    //     return $this->hasMany(CourseHistory::class);
    // }
}
