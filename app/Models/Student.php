<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    // Define the table associated with the model (optional if the table name matches the plural form of the model)
    protected $table = 'students';

    // Define which attributes can be mass-assigned
    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'gender',
        'city',
        'telegram_username',
        'facebook_username',
    ];

    // If you want to cast fields like timestamps
    protected $dates = ['deleted_at'];

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withPivot('status')->withTimestamps();
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
