<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category; // Importa el modelo Category

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 4 categorías
        Category::create([
            'name' => 'Electrónica',
            'description' => 'Dispositivos electrónicos y gadgets.'
        ]);

        Category::create([
            'name' => 'Ropa y Accesorios',
            'description' => 'Vestimenta, calzado y complementos.'
        ]);

        Category::create([
            'name' => 'Hogar y Cocina',
            'description' => 'Artículos para el hogar, utensilios de cocina y decoración.'
        ]);

        Category::create([
            'name' => 'Libros y Papelería',
            'description' => 'Libros de diversos géneros y material de oficina.'
        ]);

        // Puedes añadir más si lo deseas
        Category::create([
            'name' => 'Deportes',
            'description' => 'Equipamiento y ropa deportiva.'
        ]);
    }
}
