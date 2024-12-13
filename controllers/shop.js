import Product from "../models/product.js";
import Cart from "../models/cart.js";

const getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: `/products`,
    });
  });
};

const getIndex = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    console.log("shop", products.length);
    res.render("shop/index", {
      prods: products,
      docTitle: "index",
      path: `/`,
    });
  });
};

const getCart = (req, res, next) => {
  let userCart = [];
  Cart.getCartItems((carts) => {
    Product.fetchAllProducts((products) => {
      for (const cart of carts.products) {
        const product = products.find((pr) => pr.id === cart.id);
        if (product) {
          userCart.push({
            ...product,
            qty: cart.qty,
          });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Cart",
        products: userCart,
        totalPrice: carts.totalPrice,
      });
    });
  });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout",
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Your orders",
    path: "/orders",
  });
};

const getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product,
      docTitle: "Product",
      path: "/products",
    });
  });
};

const postDeleteCartItem = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

export default {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  products: Product.fetchAllProducts,
  postDeleteCartItem,
};
