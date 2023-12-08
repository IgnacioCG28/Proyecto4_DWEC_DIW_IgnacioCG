import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
import { sounds } from "./sounds.js";

document.addEventListener("DOMContentLoaded", (sounds) );

const productManager = new ProductManager();

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
    const searchWords = searchTerm.split(" ");
    return searchWords.every(word => productName.includes(word));
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
      const searchWords = searchTerm.split(" ");
      return searchWords.every(word => productName.includes(word));
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

  let totalPrice = 0;
  let totalQty = 0;

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

    totalPrice += product.cantidad * product.precio;
    totalQty += product.cantidad;
  });

  const TotalPrice = document.getElementById("total-price");
  TotalPrice.innerHTML = totalPrice + "€";

  const TotalQty = document.getElementById("total-products");
  TotalQty.innerHTML = totalQty;
}

// Check if there are products in localStorage
if (localStorage.getItem("products")) {
  const storedProducts = JSON.parse(localStorage.getItem("products"));
  storedProducts.forEach((product) => {
    // Check if the product already exists in productManager
    if (!productManager.getProductById(product.id)) {
      productManager.addProduct(new Product(product.nombre, product.cantidad, product.precio));
    }
  });
}

updateInventoryTable();

// Check if there are products in localStorage
if (localStorage.getItem("products")) {
  const storedProducts = JSON.parse(localStorage.getItem("products"));
  storedProducts.forEach((product) => {
    if (product.id && product.nombre && product.cantidad && product.precio) {
      // Check if the product already exists in productManager
      if (!productManager.getProductById(product.id)) {
        productManager.addProduct(new Product(product.nombre, product.cantidad, product.precio));
      }
    }
  });
}

updateInventoryTable();
