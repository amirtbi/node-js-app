import path from "path";
import fs from "fs";
const location = path.join(process.cwd(), "data", "cart.json");

const getCartProducts = (cb) => {
  fs.readFile(location, (e, fileContent) => {
    if (typeof cb !== "function") {
      throw new Error("cb function is required");
    }
    if (e) {
      return cb({ products: [], totalPrice: 0 });
    } else {
      return cb(JSON.parse(fileContent));
    }
  });
};

export class Cart {
  static getCartItems(cb) {
    return getCartProducts(cb);
  }
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

  static deleteProduct(id, productPrice) {
    getCartProducts((carts) => {
      const updatedCarts = { ...carts };
      const product = carts.products.find((pr) => pr.id === id);
      updatedCarts.products = updatedCarts.products.filter(
        (pr) => pr.id !== id
      );
      const productQty = product.qty;
      updatedCarts.totalPrice = carts.totalPrice - productPrice * productQty;

      fs.writeFile(location, JSON.stringify(updatedCarts), (e) => {
        if (e) {
          console.log("Deletion process failed");
        } else {
          console.log("Deletion process succeeded");
        }
      });
    });
  }
}

export default Cart;
