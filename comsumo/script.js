// Función para cargar y mostrar categorías
function loadCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '<p>Cargando categorías...</p>'; // Mensaje de carga

    fetch('http://localhost:8000/api/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseData => {
            const categories = responseData.data; // Asumiendo que los datos están en 'data'

            categoriesContainer.innerHTML = ''; // Limpiar mensaje de carga

            if (categories && Array.isArray(categories) && categories.length > 0) {
                const ul = document.createElement('ul');
                categories.forEach(category => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${category.name}</strong>: ${category.description}`;
                    ul.appendChild(li);
                });
                categoriesContainer.appendChild(ul);
            } else {
                categoriesContainer.innerHTML = '<p>No se encontraron categorías.</p>';
            }
        })
        .catch(error => {
            console.error('Hubo un problema al obtener las categorías:', error);
            categoriesContainer.innerHTML = `<p class="error">Error al cargar las categorías: ${error.message}</p>`;
        });
}

// Función para cargar y mostrar productos
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '<p>Cargando productos...</p>'; // Mensaje de carga

    fetch('http://localhost:8000/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseData => {
            const products = responseData.data; // Asumiendo que los datos están en 'data'

            productsContainer.innerHTML = ''; // Limpiar mensaje de carga

            if (products && Array.isArray(products) && products.length > 0) {
                const ul = document.createElement('ul');
                products.forEach(product => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${product.name}</strong> ($${product.price}): ${product.description} <small>(Categoría ID: ${product.category_id})</small>`;
                    ul.appendChild(li);
                });
                productsContainer.appendChild(ul);
            } else {
                productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            }
        })
        .catch(error => {
            console.error('Hubo un problema al obtener los productos:', error);
            productsContainer.innerHTML = `<p class="error">Error al cargar los productos: ${error.message}</p>`;
        });
}

// Llama a las funciones para cargar los datos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
});