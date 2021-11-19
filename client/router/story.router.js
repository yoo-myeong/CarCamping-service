import epxress from "express";
import multer from "multer";
import * as nodeFetch from "../middleware/nodeFetch.js";
import { config } from "../config.js";

const upload = multer({ dest: "uploads" });

const router = epxress.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("story/story.board.ejs");
});

router.get("/post", (req, res, next) => {
  res.status(200).render("story/story.post.ejs");
});

router.post("/post", upload.array("storyImg", 5), async (req, res, next) => {
  const filenames = req.files.map((img) => img.filename);
  const url = config.backendURL + "/story";
  const token = req.body.token;
  delete req.body.token;
  const json = {
    ...req.body,
    imgnames: filenames,
  };
  const response = await nodeFetch.fetchPostApiWithToken(url, json, token);
  if (response.status === 201) {
    return res.redirect("/story/detail");
  } else if (response.status === 400) {
    return res.redirect("/auth/login");
  } else {
    return res.redirect("/error");
  }
});

router.get("/detail", (req, res, next) => {
  res.status(200).render("story/story.detail.ejs");
});

export default router;
