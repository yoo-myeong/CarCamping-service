import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import storyRouter from "./router/story.router.js";
import authRouter from "./router/auth.router.js";
import shopRouter from "./router/shop.router.js";
import adminRouter from "./router/admin.router.js";
import * as nodeFetch from "./fetch/nodeFetch.js";
import { config } from "./config.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.all("/", (req, res, next) => {
  nodeFetch.fetchGetApi(config.backendURL + "/start");
  res.render("main/main.ejs");
});

app.use("/story", storyRouter);
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/admin", adminRouter);

app.all("/error", () => {
  throw new Error("server error");
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(8080, () => {
  console.log("server started on 8080 port");
});
