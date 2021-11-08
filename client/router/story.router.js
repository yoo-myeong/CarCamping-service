import epxress from "express";
import fetch from "node-fetch";

const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.render("story/story.board.ejs");
});

export default router;
