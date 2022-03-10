import express from "express";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

export default function tagRouter(tagController) {
  router.get("/", isAuth, tagController.getAllTags);
  router.delete("/:name", isAuth, tagController.deleteTag);
  router.post("/", isAuth, tagController.creatTag);

  return router;
}
