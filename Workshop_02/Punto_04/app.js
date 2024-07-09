document.addEventListener('DOMContentLoaded', () => {
    const fetchProducts = () => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(products => {
                displayProducts(products);
            })
            .catch(error => {
                displayError(error);
            });
    };

    const displayProducts = (products) => {
        const cardsContainer = document.getElementById("cards-container");
        if (!cardsContainer) {
            console.error('Element with ID "cards-container" not found.');
            return;
        }
        cardsContainer.innerHTML = '';

        if (products.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No products found.';
            cardsContainer.appendChild(noResultsMessage);
        } else {
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = "card";

                const img = document.createElement('img');
                img.src = product.category.image;
                img.className = "card-img-top";
                card.appendChild(img);

                const cardBody = document.createElement('div');
                cardBody.className = "card-body";

                const title = document.createElement('h5');
                title.className = "card-title";
                title.textContent = product.title;
                cardBody.appendChild(title);

                const description = document.createElement('p');
                description.className = "card-text";
                description.textContent = product.description;
                cardBody.appendChild(description);

                const price = document.createElement('a');
                price.classList.add("btn", "btn-primary");
                price.textContent = `$${product.price}`;
                cardBody.appendChild(price);

                card.appendChild(cardBody);
                cardsContainer.appendChild(card);
            });
        }
    };

    const displayError = (error) => {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = `Error: ${error.message}`;
        } else {
            console.error('Element with ID "error-message" not found.');
        }
    };

    const searchProducts = () => {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 0) {
            fetch(`https://api.escuelajs.co/api/v1/products?title=${searchTerm}`)
                .then(response => response.json())
                .then(products => {
                    displayProducts(products);
                    searchInput.value = ''; // Limpiar el campo de búsqueda
                })
                .catch(error => {
                    displayError(error);
                });
        } else {
            fetchProducts();
        }
    };

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            searchProducts();
        });
    } else {
        console.error('Element with ID "search-form" not found.');
    }
    fetchProducts();
});