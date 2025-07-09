<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llama a tus seeders en el orden correcto
        // Primero las categorías, luego los productos que dependen de ellas
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);

        // Si tienes un seeder de usuario, puedes llamarlo aquí también
        // \App\Models\User::factory(10)->create();
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
