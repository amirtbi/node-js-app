import express from "express";

import shopController from "../controllers/shop.js";

const shopRouter = express.Router();

shopRouter.get("/", shopController.getIndex);
shopRouter.get("/products", shopController.getProducts);
shopRouter.get("/cart", shopController.getCard);
shopRouter.get("/checkout", shopController.getCheckout);
shopRouter.get("/orders", shopController.getOrders);
shopRouter.get("/products/:productId", shopController.getProduct);

export default shopRouter;
