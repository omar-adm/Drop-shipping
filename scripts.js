document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Load products
    fetchProducts();

    function fetchProducts() {
        fetch('/content/products')
            .then(response => response.json())
            .then(data => {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = '';

                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';

                    const productTitle = document.createElement('h2');
                    productTitle.textContent = product.title;
                    productDiv.appendChild(productTitle);

                    const productDescription = document.createElement('p');
                    productDescription.textContent = product.description;
                    productDiv.appendChild(productDescription);

                    const productLink = document.createElement('a');
                    productLink.href = product.link;
                    productLink.target = '_blank';
                    productLink.textContent = 'Buy Now';
                    productDiv.appendChild(productLink);

                    if (product.image) {
                        const productImage = document.createElement('img');
                        productImage.src = product.image;
                        productImage.alt = product.title;
                        productDiv.appendChild(productImage);
                    }

                    productsContainer.appendChild(productDiv);
                });
            });
    }
});
