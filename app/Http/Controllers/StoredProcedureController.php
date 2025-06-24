<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // Para usar constantes de códigos de respuesta HTTP
use Illuminate\Support\Facades\DB; // ¡Importante para interactuar con la base de datos directamente!

// Este controlador manejará las llamadas a procedimientos almacenados relacionados con categorías.
class StoredProcedureController extends Controller // Nombre de la clase actualizado
{
    /**
     * Obtiene una categoría por su nombre usando el procedimiento almacenado 'GetCategoryByName'.
     *
     * @param  string  $name El nombre de la categoría a buscar.
     * @return \Illuminate\Http\JsonResponse
     */
    public function showCategoryByName(string $name) // Nombre del método actualizado
    {
        try {
            // Llama al procedimiento almacenado 'GetCategoryByName' y pasa el nombre como parámetro.
            // DB::select retorna un array de objetos StdClass.
            $category = DB::select('CALL GetCategoryByName(?)', [$name]);

            // Verifica si se encontró alguna categoría.
            if (empty($category)) {
                return response()->json([
                    'message' => 'Category not found using stored procedure' // Categoría no encontrada usando el procedimiento almacenado
                ], Response::HTTP_NOT_FOUND); // HTTP 404 Not Found
            }

            // Devolver la primera categoría encontrada (asumiendo que el nombre es único) y un mensaje de éxito.
            return response()->json([
                'message' => 'Category retrieved successfully using stored procedure', // Categoría recuperada correctamente usando procedimiento almacenado
                'data' => $category[0] // Accede al primer elemento del array
            ], Response::HTTP_OK); // HTTP 200 OK
        } catch (\Exception $e) {
            // En caso de error, devolver una respuesta JSON con el mensaje de error.
            return response()->json([
                'message' => 'Error retrieving category using stored procedure', // Error al recuperar la categoría usando procedimiento almacenado
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // HTTP 500 Internal Server Error
        }
    }

    /**
     * Obtiene los productos de una categoría por su ID usando el procedimiento almacenado 'GetProductsInCategory'.
     *
     * @param  string  $categoryId El ID de la categoría para buscar productos.
     * @return \Illuminate\Http\JsonResponse
     */
    public function listProductsInCategory(string $categoryId) // Nombre del método actualizado
    {
        try {
            // Llama al procedimiento almacenado 'GetProductsInCategory' y pasa el ID de la categoría como parámetro.
            // DB::select retorna un array de objetos StdClass.
            $products = DB::select('CALL GetProductsInCategory(?)', [$categoryId]);

            // Devolver la lista de productos y un mensaje de éxito.
            // Si no hay productos, $products será un array vacío, lo cual es manejado correctamente por el front-end.
            return response()->json([
                'message' => 'Products retrieved successfully for category using stored procedure', // Productos recuperados correctamente para la categoría usando procedimiento almacenado
                'data' => $products
            ], Response::HTTP_OK); // HTTP 200 OK
        } catch (\Exception $e) {
            // En caso de error, devolver una respuesta JSON con el mensaje de error.
            return response()->json([
                'message' => 'Error retrieving products for category using stored procedure', // Error al recuperar productos para la categoría usando procedimiento almacenado
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR); // HTTP 500 Internal Server Error
        }
    }
}
