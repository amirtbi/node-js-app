import Product from "../models/product.js";

const getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "admin/add-product",
  });
};

const getEditProduct = (req, res, next) => {
  const isEditMode = !!req.query.edit;
  console.log("isEdit", isEditMode);
  if (!isEditMode) {
    return res.redirect("/");
  }

  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "admin/edit-product",
      isEdit: isEditMode,
      product: product,
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
  getEditProduct,
  postAddProduct,
  getAddProducts,
  getProducts,
  postDeleteProduct,
};
