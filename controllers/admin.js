import Product from "../models/product.js";

const getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "admin/add-product",
  });
};

const editProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/edit-product", {
      prods: products,
      docTitle: "Edit product",
      path: `admin/edit-product`,
    });
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin products",
      path: `admin/products`,
    });
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.imageUrl
  );
  product.save();
  res.redirect("/");
};

const postDeleteProduct = (req, res, next) => {
  console.log(req.body);

  res.redirect("/");
};

export default {
  editProducts,
  postAddProduct,
  getAddProducts,
  getProducts,
  postDeleteProduct,
};
