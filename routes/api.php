<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoredProcedureController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::put('categories/{id}', [CategoryController::class, 'update']);
Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

Route::get('products', [ProductController::class, 'index']);
Route::post('products', [ProductController::class, 'store']);
Route::get('products/{id}', [ProductController::class, 'show']);
Route::put('products/{id}', [ProductController::class, 'update']);
// ¡Añade esta línea!
Route::delete('products/{id}', [ProductController::class, 'destroy']); // <-- ¡Esta es la clave!

Route::get('/sp/categories/{name}', [StoredProcedureController::class, 'showCategoryByName']);
Route::get('/sp/categories/{categoryId}/products', [StoredProcedureController::class, 'listProductsInCategory']);
Route::put('/sp/products/{productId}/price', [StoredProcedureController::class, 'updateProductPriceSp']);