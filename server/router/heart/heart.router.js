import express from "express";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

export default function heartRouter(heartController) {
  router.get("/stories", isAuth, heartController.getStoryOrderedByHeart);
  router.post("/", isAuth, heartController.createHeart);
  router.get("/:storyId", isAuth, heartController.getHeart);
  router.delete("/:storyId", isAuth, heartController.deleteHeart);

  return router;
}
