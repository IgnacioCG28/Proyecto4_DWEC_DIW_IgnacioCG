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

  toString() {
    return this.#products.map((product) => product.toString()).join("\n");
  }
}
