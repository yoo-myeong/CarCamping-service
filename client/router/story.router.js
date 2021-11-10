import epxress from "express";
import fetch from "node-fetch";

const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("story/story.board.ejs");
});

router.get("/post", (req, res, next) => {
  res.status(200).render("story/story.post.ejs");
});

router.post("/post", (req, res, next) => {
  res.redirect("/story/detail");
});

router.get("/detail", (req, res, next) => {
  res.send("detail page다");
});

export default router;
