<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');  // Foreign key to students
            $table->unsignedBigInteger('course_id');   // Foreign key to courses
            $table->unsignedBigInteger('batch_id');
            $table->string('status');  // e.g., active, registered, past

            // Timestamps for pivot table (optional, but useful)
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->foreign('batch_id')->references('id')->on('batches')->onDelete('cascade');

            // Ensure each student can be assigned to the same course only once
            $table->unique(['student_id', 'course_id', 'batch_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_student');
    }
};
