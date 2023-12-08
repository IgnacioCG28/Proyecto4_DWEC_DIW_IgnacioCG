import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
import { sounds } from "./sounds.js";

document.addEventListener("DOMContentLoaded", (sounds) );

const productManager = new ProductManager();

initializeInventory();

document.getElementById("product-form-events").addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productQuantity = parseInt(document.getElementById("product-quantity").value);
    const productPrice = parseFloat(document.getElementById("product-price").value);

    if (!productName || isNaN(productQuantity) || isNaN(productPrice)) {
        alert("Por favor introduce correctamente los datos:");
        return;
    }

    const newProduct = new Product(
        Date.now(),
        productName,
        productQuantity,
        productPrice
    );

    productManager.addProduct(newProduct); 
    this.reset();
    updateInventoryTable();
});

document.getElementById("body-table").addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("edit-button")) {
        const productId = parseInt(target.dataset.id);
        const editedName = prompt("Introduce el nuevo nombre:");
        const editedQuantity = prompt("Introduce la nueva cantidad:");
        const editedPrice = prompt("Introduce el nuevo precio:");

        if (editedName && editedQuantity && editedPrice) {
            const parsedQuantity = parseInt(editedQuantity);
            const parsedPrice = parseFloat(editedPrice);

            if (!isNaN(parsedQuantity) && !isNaN(parsedPrice) && parsedQuantity >= 0 && parsedPrice >= 0) {
                const updatedProduct = new Product(
                    productId,
                    editedName,
                    parsedQuantity,
                    parsedPrice
                );
                productManager.updateProductById(productId, updatedProduct);
                updateInventoryTable();
            } else {
                alert("Por favor, introduce valores numéricos válidos y no negativos para cantidad y precio.");
            }
        } else {
            alert("Por favor, introduce valores válidos para nombre, cantidad y precio.");
        }
    } else if (target.classList.contains("delete-button")) {
        const productId = parseInt(target.dataset.id);

        if (!isNaN(productId)) {
            productManager.deleteProductById(productId);
            updateInventoryTable();
        } else {
            alert("Ha ocurrido un error al eliminar el producto.");
        }
    }
});

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
    const searchTerm = document.getElementById("search-product").value.toLowerCase();
    const tableRows = document.querySelectorAll("#inventory-table-events tbody tr");
    const matchingRows = Array.from(tableRows).filter(row => {
        const productName = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        return productName.includes(searchTerm);
    });

    tableRows.forEach(row => {
        row.style.display = "none";
    });

    matchingRows.forEach(row => {
        row.style.display = "";
    });
});

const searchInput = document.getElementById("search-product");
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const searchTerm = searchInput.value.toLowerCase();
        const tableRows = document.querySelectorAll("#inventory-table-events tbody tr");
        const matchingRows = Array.from(tableRows).filter(row => {
            const productName = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
            return productName.includes(searchTerm);
        });

        if (searchTerm === "") {
            tableRows.forEach(row => {
                row.style.display = "";
            });
        } else {
            tableRows.forEach(row => {
                row.style.display = "none";
            });

            matchingRows.forEach(row => {
                row.style.display = "";
            });
        }
    }
});

function updateInventoryTable() {
    const tableBody = document.getElementById("body-table");
    tableBody.innerHTML = "";

    const products = productManager.listProducts();

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.cantidad}</td>
            <td>${product.precio}</td>
            <td>
                <button class="edit-button" data-id="${product.id}">Editar</button>
                <button class="delete-button" data-id="${product.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


//  Estos productos siempre estarán en el localStorage, no se pueden borrar 
//  porque al actualizar la página se añaden otra vez los datos, pero los añadidos nuevos si se pueden.
function initializeInventory() {
    let list;
    if (!localStorage.getItem("productData")) {
        list = [
            new Product(1, "AR-15", 100, 1500),
            new Product(2, "M24 Sniper Rifle", 75, 2500),
            new Product(3, "Remington 870 Shotgun", 80, 1200),
            new Product(4, "MP5 Submachine Gun", 120, 1800),
            new Product(5, "RPG-7 Rocket Launcher", 10, 5000),
            new Product(6, "M32 Grenade Launcher", 15, 3000),
            new Product(7, "Glock 17 Pistol", 200, 800),
            new Product(8, "Bulletproof Vest", 50, 500),
            new Product(9, "Karambit Knife", 150, 300),
            new Product(10, "Taser X26", 100, 400),
            new Product(11, "M67 Fragmentation Grenade", 50, 200),
            new Product(12, "C4 Explosive", 20, 1000),
            new Product(13, "Combat Knife", 100, 200),
            new Product(14, "Stun Gun", 80, 150),
        ];
        list.forEach((product) => productManager.addProduct(product));
        updateInventoryTable();
    } else {
        const storedData = JSON.parse(localStorage.getItem("productData"));
        storedData.forEach((productData) => {
            const product = new Product(
                productData.id,
                productData.nombre,
                productData.cantidad,
                productData.precio
            );
            productManager.addProduct(product);
        });
        updateInventoryTable();
    }
}


const TPrice = () => {
    let TPrice = 0;
    let precioUnitario = 0;
    productManager.listProducts().forEach((producto) => {
        precioUnitario += producto.cantidad * producto.precio;
        TPrice = precioUnitario;
    });

    return TPrice;
};

const TQty = () => {
    let TQty = 0;
    productManager.listProducts().forEach((producto) => {
        TQty += producto.cantidad;
    });

    return TQty;
};

const TotalPrice = document.getElementById("total-price");
TotalPrice.innerHTML = TPrice() + "€";
const TotalQty = document.getElementById("total-products");
TotalQty.innerHTML = TQty();