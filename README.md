1.- buscar el file .env.example
2.- crear un file .env y pegar todo lo de  .env.example
3.- si ustedes tienen base datos mysql modificar
    DB_CONNECTION=sqlite
    # DB_HOST=127.0.0.1
    # DB_PORT=3306
    # DB_DATABASE=laravel
    # DB_USERNAME=root
    # DB_PASSWORD=
4.- ingresan a su proyecto desde el terminar y ejecutan -> composer install
5.- terminado la instacion en terminal ejecutan -> php artisan key:generate
6.- migro mis tablas -> php artisan migrate



/* *********************************** */
crer migracion
php artisan make:migration create_products_table
crear model
php artisan make:model  Product
crear controller 
 php artisan make:controller ProductController



extra : php artisan install:api


Tarea : crear tabla que se relacione solo categoria puede ser 
items 
servicios 
...


----------------------------------------------------------
Procesos Almacenados 

-- Cambiamos el delimitador para usar bloques de código
DELIMITER //

-- Eliminamos el procedimiento si ya existe
DROP PROCEDURE IF EXISTS GetCategoryByName;

-- Creamos el procedimiento almacenado
CREATE PROCEDURE GetCategoryByName(
    IN categoryName VARCHAR(255) -- Parámetro de entrada: nombre de la categoría
)
BEGIN
    -- Seleccionamos todas las filas de la tabla 'categories'
    -- donde el campo 'name' coincida con el parámetro,
    -- usando COLLATE para asegurar una comparación sin distinción de mayúsculas/minúsculas
    SELECT *
    FROM categories
    WHERE name COLLATE utf8mb4_unicode_ci = categoryName;
END //

-- Restauramos el delimitador por defecto
DELIMITER ;


-------------------------------------------

-- Cambiar delimitador para permitir bloques BEGIN ... END
DELIMITER //

-- Eliminar el procedimiento si ya existe
DROP PROCEDURE IF EXISTS GetProductsInCategory;

-- Crear procedimiento que obtiene productos por categoría
CREATE PROCEDURE GetProductsInCategory(
    IN catId BIGINT -- Parámetro de entrada: ID de la categoría
)
BEGIN
    -- Selecciona todos los productos cuya categoría sea igual al ID proporcionado
    SELECT *
    FROM products
    WHERE category_id = catId;
END //

-- Restaurar delimitador normal
DELIMITER ;


--------------------------------------------------
DELIMITER //

-- Paso 1: Eliminar el procedimiento si ya existe
DROP PROCEDURE IF EXISTS UpdateProductPrice;

-- Paso 2: Crear el procedimiento
CREATE PROCEDURE UpdateProductPrice(
    IN productId BIGINT,
    IN newPrice DECIMAL(8, 2)
)
BEGIN
    -- Actualiza la tabla 'products'.
    -- Establece el nuevo precio para el producto cuyo ID coincida con 'productId'.
    UPDATE products
    SET price = newPrice
    WHERE id = productId;
END //

DELIMITER ;




DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=                   puerto ejemplo  : DB_PORT= 3307
DB_DATABASE=               Nombre base de datos
DB_USERNAME=root
DB_PASSWORD=          contraseña