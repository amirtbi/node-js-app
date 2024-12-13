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
  res.render("shop/cart", {
    path: "/cart",
    docTitle: "Cart",
  });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(req.body);
  Product.findById(productId, (product) => {
    console.log("find product", product);
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

export default {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  products: Product.fetchAllProducts,
};
