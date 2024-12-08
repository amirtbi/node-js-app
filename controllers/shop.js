import Product from "../models/product.js";

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
    res.render("shop/index", {
      prods: products,
      docTitle: "index",
      path: `/`,
    });
  });
};

const getCard = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    docTitle: "Cart",
  });
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

export default {
  getProducts,
  getIndex,
  getCard,
  getCheckout,
  getOrders,
  products: Product.fetchAllProducts,
};
