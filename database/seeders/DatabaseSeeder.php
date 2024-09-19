<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $adminRole = Role::factory()->create([
            'name' => 'admin',
        ]);

        $userRole = Role::factory()->create([
            'name' => 'user',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            "role_id" => $adminRole->id,
        ]);
    }
}
