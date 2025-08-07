<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function lista_todos_los_productos()
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    #[Test]
    public function crea_un_producto()
    {
        $category = Category::factory()->create();

        $payload = [
            'name' => 'Producto de prueba',
            'description' => 'Descripción',
            'price' => 19.99,
            'category_id' => $category->id,
        ];

        $response = $this->postJson('/api/products', $payload);

        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'Producto creado correctamente',
                     'data' => ['name' => 'Producto de prueba'],
                 ]);
    }

    #[Test]
    public function muestra_un_producto()
    {
        $product = Product::factory()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Producto recuperado correctamente', // Cambiado para coincidir con el controlador
                     'data' => ['id' => $product->id],
                 ]);
    }

    #[Test]
    public function devuelve_404_si_producto_no_existe()
    {
        $response = $this->getJson('/api/products/999');

        $response->assertStatus(404)
                 ->assertJson([
                     'message' => 'Producto no encontrado',
                 ]);
    }

    #[Test]
    public function actualiza_un_producto()
    {
        $category = Category::factory()->create();

        $product = Product::factory()->create([
            'category_id' => $category->id,
        ]);

        // Ahora enviamos todos los campos requeridos para la validación
        $newData = [
            'name' => 'Nuevo nombre',
            'price' => 99.99,
            'category_id' => $category->id,
            'description' => 'Descripción actualizada',
        ];

        $response = $this->putJson("/api/products/{$product->id}", $newData);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Producto actualizado correctamente',
                     'data' => ['name' => 'Nuevo nombre'],
                 ]);
    }

    
}
