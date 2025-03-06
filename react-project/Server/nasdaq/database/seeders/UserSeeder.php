<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)->create();
        $user = User::find(1);
        $user->name = 'admin';
        $user->save();
        $user = User::find(2);
        $user->name = 'nasdaq';
        $user->save();
    }
}
