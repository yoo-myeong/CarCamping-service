import epxress from "express";
const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.render("shop/shop.board.ejs");
});

router.get("/post", (req, res, next) => {
  res.render("shop/shop.post.ejs");
});

router.get("/detail", (req, res, next) => {
  res.render("shop/shop.detail.ejs");
});
export default router;
