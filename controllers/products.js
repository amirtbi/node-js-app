import Product from "../models/product.js";

const getAllProducts = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "admin/add-product",
  });
};

const postProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/shop/product-list");
};

const getProducts = (req, res, next) => {
  // const filePath = path.join(process.cwd(), "views", "shop.html");
  Product.fetchAllProducts((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Product list",
      path: `shop/product-list`,
    });
  });
};

const getAdminProducts = (req, res, next) => {
  // const filePath = path.join(process.cwd(), "views", "shop.html");
  // res.sendFile(filePath);

  Product.fetchAllProducts((products) => {
    res.render("admin/edit-product", {
      prods: products,
      docTitle: "Edit product",
      path: `admin/edit-product`,
      editProduct: editProduct,
    });
  });
};

const editProduct = (req, res, next) => {
  const id = req.body.id;
  Product.edit(id);
};

export default {
  getAllProducts,
  postProduct,
  getProducts,
  products: Product.fetchAllProducts,
  adminProds: getAdminProducts,
  editProduct,
};
