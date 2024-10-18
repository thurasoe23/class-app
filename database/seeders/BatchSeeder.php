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
        foreach (range(1, 10) as $index) {
            Batch::create([
                'course_id' => rand(1, 5), // Randomly assign course IDs
                'batch_identifier' => 'Batch ' . chr(65 + $index), // A, B, C, etc.
                'start_date' => now()->addMonths(rand(1, 3)),
                'end_date' => now()->addMonths(rand(4, 6)),
            ]);
        }
    }
}
