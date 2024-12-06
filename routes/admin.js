import express from "express";
//import path from "path";

import productController from "../controllers/products.js";

const adminRouter = express.Router();

adminRouter.get("/add-product", productController.getAllProducts);

adminRouter.post("/add-product", productController.postProduct);
adminRouter.get("/edit-product", productController.adminProds);
adminRouter.delete("/edit-product", productController.adminProds);

export default {
  router: adminRouter,
  products: productController.products,
};
