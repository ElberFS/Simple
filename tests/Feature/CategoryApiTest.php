<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function puede_listar_las_categorias(): void
    {
        Category::factory()->count(3)->create();

        $response = $this->getJson('/api/categories');

        $response->assertStatus(200)
                    ->assertJsonStructure([
                        'message',
                        'data' => [['id', 'name', 'description', 'created_at', 'updated_at']]
                    ]);
    }

    #[Test]
    public function puede_crear_una_categoria_valida(): void{
        $data = [
            'name' => 'Nueva categoría',
            'description' => 'Descripción opcional',
        ];


        $response = $this->postJson('/api/categories', $data);

        $response->assertStatus(201)
                ->assertJson([
                    'message' => 'Categoría creada correctamente',
                    'data' => ['name' => 'Nueva categoría'],
                ]);

        $this->assertDatabaseHas('categories', $data);
    }

    #[Test]
    public function puede_crear_una_categoria_sin_nombre(): void{
        
        $response = $this->postJson('/api/categories', []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name']);
    }

    #[Test]
    public function puede_ver_una_categoria(): void{
        
        $category = Category::factory()->create();

        $response = $this->getJson("/api/categories/{$category->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Categoría recuperada correctamente',
                    'data' => ['id' => $category->id],
                ]);

    }

    #[Test]
    public function devuelve_404_si_categoria_no_existe(): void{

        $response = $this->getJson("/api/categories/999");

        $response->assertStatus(404)
                ->assertJson([
                    'message' => 'Categoría no encontrada'
                ]);
    }

      #[Test]
    public function puede_actualizar_categoria(): void
    {
        $category = Category::factory()->create([
            'name' => 'Original',
        ]);

        $data = ['name' => 'Modificada', 'description' => 'Nueva descripción'];

        $response = $this->putJson("/api/categories/{$category->id}", $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Categoría actualizada correctamente',
                     'data' => ['name' => 'Modificada']
                 ]);

        $this->assertDatabaseHas('categories', $data);
    }

    #[Test]
    public function puede_eliminar_categoria(): void
    {
        $category = Category::factory()->create();

        $response = $this->deleteJson("/api/categories/{$category->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);

    }
}