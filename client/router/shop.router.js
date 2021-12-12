import epxress from "express";
import multer from "multer";
import * as nodeFetch from "../middleware/nodeFetch.js";
import { config } from "../config.js";

const upload = multer({ dest: "uploads" });

const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.render("shop/shop.board.ejs");
});

router.get("/post", (req, res, next) => {
  res.render("shop/shop.post.ejs");
});

router.post("/post", upload.array("shopImg", 5), async (req, res, next) => {
  const filenames = req.files.map((img) => img.filename);
  const url = config.backendURL + "/shop";
  const token = req.body.token;
  delete req.body.token;
  const json = {
    ...req.body,
    imgnames: filenames,
  };
  const response = await nodeFetch.fetchPostApiWithToken(url, json, token);
  const responseToJson = await response.json();
  if (response.status === 201) {
    return res.redirect("/shop/detail/" + responseToJson.shopId);
  } else {
    console.error(responseToJson);
    return res.send("error");
  }
});

router.get("/detail/:id", (req, res, next) => {
  const shopId = req.params.id;
  res.render("shop/shop.detail.ejs", { shopId });
});

export default router;
