import epxress from "express";
import fetch from "node-fetch";

const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("shop/shop.board.ejs");
});

router.get("/post", (req, res, next) => {
  res.status(200).render("shop/shop.post.ejs");
});

export default router;
