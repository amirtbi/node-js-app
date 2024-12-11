import express from "express";
//import path from "path";

import adminController from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.get("/add-product", adminController.getAddProducts);

adminRouter.post("/add-product", adminController.postAddProduct);
adminRouter.get("/edit-product/:productId", adminController.getEditProduct);
adminRouter.get("/products", adminController.getProducts);
adminRouter.post("/delete-product", adminController.postDeleteProduct);

export default {
  router: adminRouter,
  products: adminController.products,
};
