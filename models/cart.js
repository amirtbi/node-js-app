import path from "path";
import fs from "fs";
const location = path.join(process.cwd(), "data", "cart.json");

export class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(location, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        const parsedContent = JSON.parse(fileContent);
        if (parsedContent && parsedContent.products) {
          cart = JSON.parse(fileContent);
        }
      }

      const existedProductInCartIndex = cart.products.findIndex(
        (pr) => pr.id == id
      );
      let updateProduct;
      console.log("index", existedProductInCartIndex);
      if (existedProductInCartIndex > -1) {
        const existedProduct = cart.products[existedProductInCartIndex];
        updateProduct = { ...existedProduct };
        updateProduct.qty = existedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existedProductInCartIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }

      cart.totalPrice = cart.totalPrice + Number(productPrice);
      fs.writeFile(location, JSON.stringify(cart), (error) => {
        if (error) {
          console.log("error");
        } else {
          console.log("writting file successfylly done");
        }
      });
    });
  }
}

export default Cart;
