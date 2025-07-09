<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product; // Importa el modelo Product
use App\Models\Category; // Importa el modelo Category para obtener IDs

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asegúrate de que las categorías existan antes de crear productos
        // Puedes obtener los IDs de las categorías para asignarlos a los productos
        $electronicsCategory = Category::where('name', 'Electrónica')->first();
        $clothingCategory = Category::where('name', 'Ropa y Accesorios')->first();
        $homeCategory = Category::where('name', 'Hogar y Cocina')->first();
        $booksCategory = Category::where('name', 'Libros y Papelería')->first();
        $sportsCategory = Category::where('name', 'Deportes')->first();


        // Crear 15 productos (más de 10)
        // Asegúrate de que las categorías existan antes de asignar category_id
        if ($electronicsCategory) {
            Product::create([
                'name' => 'Smartphone X',
                'description' => 'Último modelo de smartphone con cámara de alta resolución.',
                'price' => 799.99,
                'category_id' => $electronicsCategory->id,
            ]);
            Product::create([
                'name' => 'Auriculares Bluetooth',
                'description' => 'Auriculares inalámbricos con cancelación de ruido.',
                'price' => 120.50,
                'category_id' => $electronicsCategory->id,
            ]);
            Product::create([
                'name' => 'Smart TV 55 pulgadas',
                'description' => 'Televisor inteligente 4K con Android TV.',
                'price' => 599.00,
                'category_id' => $electronicsCategory->id,
            ]);
        }

        if ($clothingCategory) {
            Product::create([
                'name' => 'Camiseta de algodón',
                'description' => 'Camiseta básica de algodón 100% para hombre.',
                'price' => 15.99,
                'category_id' => $clothingCategory->id,
            ]);
            Product::create([
                'name' => 'Jeans Slim Fit',
                'description' => 'Pantalones vaqueros ajustados de mezclilla.',
                'price' => 45.00,
                'category_id' => $clothingCategory->id,
            ]);
            Product::create([
                'name' => 'Zapatillas Deportivas',
                'description' => 'Zapatillas cómodas para correr y entrenar.',
                'price' => 85.75,
                'category_id' => $clothingCategory->id,
            ]);
        }

        if ($homeCategory) {
            Product::create([
                'name' => 'Set de Sartenes Antiadherentes',
                'description' => 'Juego de 3 sartenes con recubrimiento cerámico.',
                'price' => 60.25,
                'category_id' => $homeCategory->id,
            ]);
            Product::create([
                'name' => 'Cafetera Programable',
                'description' => 'Cafetera de goteo con temporizador y filtro permanente.',
                'price' => 35.00,
                'category_id' => $homeCategory->id,
            ]);
            Product::create([
                'name' => 'Aspiradora Robótica',
                'description' => 'Aspiradora inteligente con mapeo de habitaciones.',
                'price' => 250.00,
                'category_id' => $homeCategory->id,
            ]);
        }

        if ($booksCategory) {
            Product::create([
                'name' => 'El Señor de los Anillos',
                'description' => 'Novela épica de fantasía de J.R.R. Tolkien.',
                'price' => 25.99,
                'category_id' => $booksCategory->id,
            ]);
            Product::create([
                'name' => 'Cuaderno A4 Espiral',
                'description' => 'Cuaderno de 100 hojas con espiral y tapa dura.',
                'price' => 5.50,
                'category_id' => $booksCategory->id,
            ]);
        }

        if ($sportsCategory) {
            Product::create([
                'name' => 'Mancuernas Ajustables',
                'description' => 'Set de mancuernas ajustables de 2.5kg a 20kg.',
                'price' => 150.00,
                'category_id' => $sportsCategory->id,
            ]);
            Product::create([
                'name' => 'Esterilla de Yoga',
                'description' => 'Esterilla antideslizante para yoga y pilates.',
                'price' => 20.00,
                'category_id' => $sportsCategory->id,
            ]);
            Product::create([
                'name' => 'Balón de Baloncesto',
                'description' => 'Balón oficial de baloncesto talla 7.',
                'price' => 30.00,
                'category_id' => $sportsCategory->id,
            ]);
        }
    }
}
