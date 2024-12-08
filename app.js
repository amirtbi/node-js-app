import express from "express";

import AdminRouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import errorControler from "./controllers/error.js";
import path from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/admin", AdminRouter.router);
app.use("/", shopRouter);

app.use(errorControler.getError);

app.listen(4000);
