import { LocalStorage } from "./localStorage.js";

export class ProductManager extends LocalStorage {
  #productsKey = "products";
  #products;

  constructor() {
    super();
    this.#products = LocalStorage.getData(this.#productsKey);
  }

  listProducts() {
    return this.#products;
  }

  addProduct(product) {
    const existingProduct = this.#products.find((p) => p.id === product.id);
    if (existingProduct) {
      console.log("Producto con mismo ID ya existe.");
      return;
    }
    this.#products.push(product);
    this.saveProducts();
  }

  searchProductInTable(productName) {
    const tableRows = document.querySelectorAll("table tbody tr");
    tableRows.forEach((row) => {
      const nameCell = row.querySelector(".product-name");
      if (
        nameCell.textContent.toLowerCase().includes(productName.toLowerCase())
      ) {
        row.classList.add("highlighted");
      } else {
        row.classList.remove("highlighted");
      }
    });
  }

  updateProductById(id, updatedProduct) {
    const index = this.#products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.#products[index] = updatedProduct;
      this.saveProducts();
    }
  }

  deleteProductById(id) {
    const index = this.#products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.#products.splice(index, 1);
      this.saveProducts();
    }
  }

  saveProducts() {
    LocalStorage.setData(this.#productsKey, this.#products);
  }
}
