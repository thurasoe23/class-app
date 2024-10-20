<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Batch;

class BatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
            Batch::create([
                'course_id' => 1, // Randomly assign course IDs
                'batch_identifier' => 'Batch 1', // A, B, C, etc.
                'start_date' => now()->addMonths(rand(1, 3)),
                'end_date' => now(),
            ]);
    }
}
