<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class SameVisitDateReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reports')->insert([
            'visit_date' => Carbon::now(),
            'customer_id' => 1,
            'detail' => '同じ訪問日の訪問記録1',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('reports')->insert([
            'visit_date' => Carbon::now(),
            'customer_id' => 1,
            'detail' => '同じ訪問日の訪問記録2',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
