const API_BASE_URL = 'http://localhost:8000/api';

function displayMessage(messageBoxElement, message, type, errors = null) {
    messageBoxElement.textContent = '';
    messageBoxElement.classList.remove('success', 'error');
    messageBoxElement.style.display = 'block';

    let content = `<p>${message}</p>`;

    if (errors) {
        content += '<ul>';
        for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
                errors[key].forEach(error => {
                    content += `<li>- ${error}</li>`;
                });
            }
        }
        content += '</ul>';
    }
    messageBoxElement.innerHTML = content;
    messageBoxElement.classList.add(type);
}

function clearMessage(messageBoxElement) {
    messageBoxElement.textContent = '';
    messageBoxElement.style.display = 'none';
    messageBoxElement.classList.remove('success', 'error');
}

async function loadCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    const productCategorySelect = document.getElementById('product-category');

    categoriesContainer.innerHTML = '<p>Cargando categorías...</p>';
    productCategorySelect.innerHTML = '<option value="">Cargando categorías...</option>';

    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const responseData = await response.json();
        const categories = responseData.data;

        categoriesContainer.innerHTML = '';

        productCategorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';
        if (categories && Array.isArray(categories) && categories.length > 0) {
            const ul = document.createElement('ul');
            categories.forEach(ca => {
                const li = document.createElement('li');
                li.classList.add('list-item');
                li.innerHTML = `
                    <div>
                        <strong>${ca.name}</strong>: ${ca.description || 'sin descripción'}
                    </div>
                    <div class="actions">
                        <button class="edit-btn" data-id="${ca.id}" data-name="${ca.name}" data-description="${ca.description || ''}">Editar</button>
                        <button class="delete-btn" data-id="${ca.id}">Eliminar</button>
                    </div>
                `;
                ul.appendChild(li);

                const option = document.createElement('option');
                option.value = ca.id;
                option.textContent = ca.name;
                productCategorySelect.appendChild(option);
            });
            categoriesContainer.appendChild(ul);

            document.querySelectorAll('#categories-container .edit-btn').forEach(button => {
                button.addEventListener('click', editCategory);
            });
            document.querySelectorAll('#categories-container .delete-btn').forEach(button => {
                button.addEventListener('click', deleteCategory);
            });

        } else {
            categoriesContainer.innerHTML = '<p>No se encontraron categorías.</p>';
        }

    } catch (error) {
        console.error('Hubo un problema al obtener las categorías:', error);
        categoriesContainer.innerHTML = `<p style="color: red;">Error al cargar las categorías: ${error.message}</p>`;
        productCategorySelect.innerHTML = '<option value="">Error al cargar categorías</option>';
    }
}

async function registerCategory(event) {
    event.preventDefault();

    const form = event.target;
    const categoryId = document.getElementById('category-id').value;
    const name = form['category-name'].value;
    const description = form['category-description'].value;
    const messageBox = document.getElementById('category-message');

    clearMessage(messageBox);

    const method = categoryId ? 'PUT' : 'POST';
    const url = categoryId ? `${API_BASE_URL}/categories/${categoryId}` : `${API_BASE_URL}/categories`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });

        const responseData = await response.json();
        if (response.ok) {
            displayMessage(messageBox, responseData.message || `Categoría ${categoryId ? 'actualizada' : 'registrada'} con éxito.`, 'success');
            form.reset();
            document.getElementById('category-id').value = '';
            document.getElementById('category-submit-btn').textContent = 'Registrar Categoría';
            document.getElementById('category-cancel-btn').style.display = 'none';
            loadCategories();
        } else {
            let errorMessage = responseData.message || `Error al ${categoryId ? 'actualizar' : 'registrar'} la categoría.`;
            displayMessage(messageBox, errorMessage, 'error', responseData.errors);
        }
    } catch (error) {
        console.error('Error en la operación de categoría:', error);
        displayMessage(messageBox, `Error de conexión: ${error.message}`, 'error');
    }
}

async function editCategory(event) {
    const button = event.target;
    const id = button.dataset.id;
    const name = button.dataset.name;
    const description = button.dataset.description;

    document.getElementById('category-id').value = id;
    document.getElementById('category-name').value = name;
    document.getElementById('category-description').value = description;
    document.getElementById('category-submit-btn').textContent = 'Actualizar Categoria';
    document.getElementById('category-cancel-btn').style.display = 'inline-block';
    clearMessage(getElementById('category-message'));
}

async function deleteCategory(event) {
    const categoryId = event.target.dataset.id;
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`,{
        method: 'DELETE',
        headers : {'Accept': 'application/json'}
            
    });
    const messageBox = document.getElementById('categories-container');
    if(response.ok){
        displayMessage(messageBox,'categoria eliminada');
        loadCategories();
    }
}

function cancelCategoryEdit() {
    document.getElementById('category-form').reset();
    document.getElementById('category-id').value = '';
    document.getElementById('category-submit-btn').textContent = 'Registrar Categoría';
    document.getElementById('category-cancel-btn').style.display = 'none';
    clearMessage(document.getElementById('category-message'));
}

async function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '<p>Cargando productos...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const responseData = await response.json();
        const products = responseData.data;

        productsContainer.innerHTML = '';

        if (products && Array.isArray(products) && products.length > 0) {
            const ul = document.createElement('ul');
            products.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('list-item');
                li.innerHTML = `
                    <div>
                        <strong>${product.name}</strong> - Precio: S/ ${product.price || 'N/A'} - Categoría: ${product.category ? product.category.name : 'Sin Categoría'}<br>Descripción: ${product.description || 'sin descripción'}
                    </div>
                    <div class="actions">
                        <button class="edit-btn" data-id="${product.id}" data-name="${product.name}" data-description="${product.description || ''}" data-price="${product.price}" data-category-id="${product.category_id || ''}">Editar</button>
                        <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                    </div>
                `;
                ul.appendChild(li);
            });
            productsContainer.appendChild(ul);

            document.querySelectorAll('#products-container .edit-btn').forEach(button => {
                button.addEventListener('click', editProduct);
            });
            document.querySelectorAll('#products-container .delete-btn').forEach(button => {
                button.addEventListener('click', deleteProduct);
            });

        } else {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
        }

    } catch (error) {
        console.error('Hubo un problema al obtener los productos:', error);
        productsContainer.innerHTML = `<p style="color: red;">Error al cargar los productos: ${error.message}</p>`;
    }
}

async function registerProduct(event) {
    event.preventDefault();

    const form = event.target;
    const productId = document.getElementById('product-id').value;
    const name = form['product-name'].value;
    const description = form['product-description'].value;
    const price = parseFloat(form['product-price'].value);
    const category_id = parseInt(form['product-category'].value);
    const messageBox = document.getElementById('product-message');

    clearMessage(messageBox);

    const method = productId ? 'PUT' : 'POST';
    const url = productId ? `${API_BASE_URL}/products/${productId}` : `${API_BASE_URL}/products`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, description, price, category_id })
        });

        const responseData = await response.json();
        if (response.ok) {
            displayMessage(messageBox, responseData.message || `Producto ${productId ? 'actualizado' : 'registrado'} con éxito.`, 'success');
            form.reset();
            document.getElementById('product-id').value = '';
            document.getElementById('product-submit-btn').textContent = 'Registrar Producto';
            document.getElementById('product-cancel-btn').style.display = 'none';
            loadProducts();
        } else {
            let errorMessage = responseData.message || `Error al ${productId ? 'actualizar' : 'registrar'} el producto.`;
            displayMessage(messageBox, errorMessage, 'error', responseData.errors);
        }
    } catch (error) {
        console.error('Error en la operación de producto:', error);
        displayMessage(messageBox, `Error de conexión: ${error.message}`, 'error');
    }
}

async function editProduct(event) {
    const button = event.target;
    const id = button.dataset.id;
    const name = button.dataset.name;
    const description = button.dataset.description;
    const price = button.dataset.price;
    const categoryId = button.dataset.categoryId;
    
    document.getElementById('product-id').value = id;
    document.getElementById('product-name').value = name;
    document.getElementById('product-description').value = description;
    document.getElementById('product-price').value = price ;
    document.getElementById('product-category').value = categoryId;
    document.getElementById('product-submit-btn').textContent = 'Actualizar Producto';
    document.getElementById('product-cancel-btn').style.display = 'inline-block';
    clearMessage(document.getElementById('product-message'));
}

async function deleteProduct(event) {
    const productId = event.target.dataset.id;
    const response = await fetch(`${API_BASE_URL}/products/${productId}`,{
        method: 'DELETE',
        headers : {'Accept': 'application/json'}
    });
    const messageBox = document.getElementById('products-container');
    if(response.ok){
        displayMessage(messageBox,'Producto eliminado');
        loadProducts();
    }
}

function cancelProductEdit() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-submit-btn').textContent = 'Registrar Producto';
    document.getElementById('product-cancel-btn').style.display = 'none';
    clearMessage(document.getElementById('product-message'));
}

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();

    document.getElementById('category-form').addEventListener('submit', registerCategory);
    document.getElementById('category-cancel-btn').addEventListener('click', cancelCategoryEdit);

    document.getElementById('product-form').addEventListener('submit', registerProduct);
    document.getElementById('product-cancel-btn').addEventListener('click', cancelProductEdit);
});