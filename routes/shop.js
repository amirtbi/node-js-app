import express from "express";

import productController from "../controllers/products.js";

const shopRouter = express.Router();

shopRouter.get("/", productController.getProducts);

export default shopRouter;
