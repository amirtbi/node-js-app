import path from "path";
import fs from "fs";
import Cart from "./cart.js";

const getProductsFromFile = (cb) => {
  const location = path.join(process.cwd(), "data", "products.json");
  fs.readFile(location, (error, fileContent) => {
    console.log("error", error, fileContent);
    if (typeof cb !== "function") {
      throw new Error("callback function is required!");
    }
    if (error) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

class Product {
  constructor(id, title, description, price, imageUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.id = id;
  }

  static savePath() {
    return path.join(process.cwd(), "data", "products.json");
  }

  static edit(productId) {
    const location = path.join(process.cwd(), "data", "products.json");

    this.fetchAllProducts((products) => {
      const foundProduct = products.find((pr) => pr.id === productId);
      if (foundProduct) {
        const newProducts = products.filter((pr) => pr.id !== productId);
        fs.writeFile(location, JSON.stringify(newProducts), (e) => {
          console.log("error", e);
        });
      }
    });
  }

  static delete(productId) {
    const location = path.join(process.cwd(), "data", "products.json");
    this.fetchAllProducts((products) => {
      const prduct = products.find((pr) => pr.id === productId);

      const updatedProducts = products.filter((pr) => pr.id !== productId);

      fs.writeFile(location, JSON.stringify(updatedProducts), (e) => {
        if (e) {
          console.log("error happened during deletion");
        } else {
          Cart.deleteProduct(productId, prduct.price);
          console.log("Deletion process succeeded");
        }
      });
    });
  }
  save() {
    const location = path.join(process.cwd(), "data", "products.json");
    getProductsFromFile((products) => {
      console.log("this", this);
      if (this.id) {
        const foundExistedProductIndex = products.findIndex(
          (pr) => pr.id == this.id
        );
        if (foundExistedProductIndex > -1) {
          const updatedProducts = [...products];
          updatedProducts[foundExistedProductIndex] = this;
          fs.writeFile(location, JSON.stringify(updatedProducts), (e) => {
            if (e) {
              console.log("Updating product is failed");
            } else {
              console.log("Product updated successfully");
            }
          });
        } else {
          console.log("Product not found!");
        }
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(location, JSON.stringify(products), (e) => {
          console.log("error", e);
        });
      }
    });
  }

  static fetchAllProducts(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((pr) => pr.id === id);
      cb(product);
    });
  }
}

export default Product;
