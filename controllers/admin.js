import Product from "../models/product.js";

const getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "admin/add-product",
  });
};

const getEditProduct = (req, res, next) => {
  const isEditMode = !!req.query.edit;
  if (!isEditMode) {
    return res.redirect("/");
  }

  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    console.log("product", product);
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "admin/edit-product",
      isEdit: isEditMode,
      product: product,
    });
  });
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const {
    title: updatedTitle,
    imageUrl: updateimageUrl,
    description: updatedDescription,
    price: UpdatedPrice,
  } = req.body;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedDescription,
    UpdatedPrice,
    updateimageUrl
  );
  updatedProduct.save();
  res.redirect("/admin/products");
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
    null,
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
  postEditProduct,
};
