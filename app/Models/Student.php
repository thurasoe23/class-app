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
        'facebook_username',
    ];

    protected $dates = ['deleted_at'];

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withPivot('status')->withTimestamps();
    }

    public function batches()
    {
        return $this->belongsToMany(Batch::class)->withPivot('status')->withTimestamps();
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
