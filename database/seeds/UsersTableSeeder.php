<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'auth_id_str' => '915518888367943680',
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'remember_token' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
