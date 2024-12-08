import path from "path";
import fs from "fs";

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
  constructor(title, description, price, imageUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.id = new Date().toDateString();
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
    console.log("product id", productId);
  }
  save() {
    const location = path.join(process.cwd(), "data", "products.json");
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(location, JSON.stringify(products), (e) => {
        console.log("error", e);
      });
    });
  }

  static fetchAllProducts(cb) {
    getProductsFromFile(cb);
  }
}

export default Product;
