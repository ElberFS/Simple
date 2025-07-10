// Base URL for your Laravel API
const API_BASE_URL = 'http://localhost:8000/api';


function displayMessage(messageBoxElement, message, type, errors = null) {
    messageBoxElement.classList.remove('hidden', 'success', 'error');
    messageBoxElement.classList.add(type);
    let content = `<p>${message}</p>`;

    if (errors) {
        content += '<ul class="error-list">';
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                errors[key].forEach(error => {
                    content += `<li>${error}</li>`;
                });
            }
        }
        content += '</ul>';
    }
    messageBoxElement.innerHTML = content;
}


function clearMessage(messageBoxElement) {
    messageBoxElement.classList.add('hidden');
    messageBoxElement.innerHTML = '';
}

// Función para cargar y mostrar categorías
async function loadCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '<p>Cargando categorías...</p>'; // Mensaje de carga

    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const responseData = await response.json();
        const categories = responseData.data; // Asumiendo que los datos están en 'data'

        categoriesContainer.innerHTML = ''; // Limpiar mensaje de carga

        if (categories && Array.isArray(categories) && categories.length > 0) {
            const ul = document.createElement('ul');
            ul.classList.add('list-disc', 'pl-5', 'space-y-1'); // Añadido clases Tailwind
            categories.forEach(category => {
                const li = document.createElement('li');
                li.classList.add('text-gray-700'); // Añadido clases Tailwind
                li.innerHTML = `<strong class="text-indigo-700">${category.name}</strong>: ${category.description || 'Sin descripción'}`;
                ul.appendChild(li);
            });
            categoriesContainer.appendChild(ul);
        } else {
            categoriesContainer.innerHTML = '<p class="text-gray-600">No se encontraron categorías.</p>'; // Añadido clases Tailwind
        }
    } catch (error) {
        console.error('Hubo un problema al obtener las categorías:', error);
        categoriesContainer.innerHTML = `<p class="text-red-600">Error al cargar las categorías: ${error.message}</p>`; // Añadido clases Tailwind
    }
}

// Función para cargar y mostrar productos
async function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '<p>Cargando productos...</p>'; // Mensaje de carga

    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const responseData = await response.json();
        const products = responseData.data; // Asumiendo que los datos están en 'data'

        productsContainer.innerHTML = ''; // Limpiar mensaje de carga

        if (products && Array.isArray(products) && products.length > 0) {
            const ul = document.createElement('ul');
            ul.classList.add('list-disc', 'pl-5', 'space-y-1'); // Añadido clases Tailwind
            products.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('text-gray-700'); // Añadido clases Tailwind
                // Asegúrate de que product.category exista antes de acceder a product.category.name
                li.innerHTML = `<strong class="text-indigo-700">${product.name}</strong> ($${parseFloat(product.price).toFixed(2)}): ${product.description || 'Sin descripción'} <small class="text-gray-500">(Categoría: ${product.category ? product.category.name : 'Desconocida'})</small>`;
                ul.appendChild(li);
            });
            productsContainer.appendChild(ul);
        } else {
            productsContainer.innerHTML = '<p class="text-gray-600">No se encontraron productos.</p>'; // Añadido clases Tailwind
        }
    } catch (error) {
        console.error('Hubo un problema al obtener los productos:', error);
        productsContainer.innerHTML = `<p class="text-red-600">Error al cargar los productos: ${error.message}</p>`; // Añadido clases Tailwind
    }
}


function populateCategorySelect(categories) {
    const selectElement = document.getElementById('product-category');
    selectElement.innerHTML = '<option value="">Seleccione una categoría</option>'; // Reset options

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        selectElement.appendChild(option);
    });
}

// Función para registrar una nueva categoría
async function registerCategory(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    const form = event.target;
    const name = form['category-name'].value;
    const description = form['category-description'].value;
    const messageBox = document.getElementById('category-message');

    clearMessage(messageBox); // Limpiar mensajes anteriores

    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Importante para que Laravel devuelva errores JSON
            },
            body: JSON.stringify({ name, description })
        });

        const responseData = await response.json();

        if (response.ok) {
            displayMessage(messageBox, responseData.message || 'Categoría registrada con éxito.', 'success');
            form.reset(); // Limpiar el formulario
            loadCategories(); // Recargar la lista de categorías
        } else {
            // Manejar errores de validación u otros errores del servidor
            const errorMessage = responseData.message || 'Error al registrar la categoría.';
            displayMessage(messageBox, errorMessage, 'error', responseData.errors);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud de categoría:', error);
        displayMessage(messageBox, `Error de conexión: ${error.message}`, 'error');
    }
}

// Función para registrar un nuevo producto
async function registerProduct(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    const form = event.target;
    const name = form['product-name'].value;
    const description = form['product-description'].value;
    const price = form['product-price'].value;
    const category_id = form['product-category'].value;
    const messageBox = document.getElementById('product-message');

    clearMessage(messageBox); // Limpiar mensajes anteriores

    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Importante para que Laravel devuelva errores JSON
            },
            body: JSON.stringify({ name, description, price, category_id })
        });

        const responseData = await response.json();

        if (response.ok) {
            displayMessage(messageBox, responseData.message || 'Producto registrado con éxito.', 'success');
            form.reset(); // Limpiar el formulario
            loadProducts(); // Recargar la lista de productos
        } else {
            // Manejar errores de validación u otros errores del servidor
            const errorMessage = responseData.message || 'Error al registrar el producto.';
            displayMessage(messageBox, errorMessage, 'error', responseData.errors);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud de producto:', error);
        displayMessage(messageBox, `Error de conexión: ${error.message}`, 'error');
    }
}

// Llama a las funciones para cargar los datos y adjuntar listeners cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    loadCategories(); // Carga inicial de categorías y también pobla el select de productos
    loadProducts(); // Carga inicial de productos

    // Adjuntar el listener al formulario de categorías
    document.getElementById('category-form').addEventListener('submit', registerCategory);

    // Adjuntar el listener al formulario de productos
    document.getElementById('product-form').addEventListener('submit', registerProduct);
});
