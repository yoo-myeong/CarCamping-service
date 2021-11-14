import epxress from "express";
import fetch from "node-fetch";
import multer from "multer";

const upload = multer({ dest: "uploads" });

const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("story/story.board.ejs");
});

router.get("/post", (req, res, next) => {
  res.status(200).render("story/story.post.ejs");
});

router.post("/post", upload.array("storyImg", 5), (req, res, next) => {
  const filenames = req.files.map((img) => img.filename);
  console.log(filenames);
  res.redirect("/story/detail");
});

router.get("/detail", (req, res, next) => {
  res.status(200).render("story/story.detail.ejs");
});

export default router;
