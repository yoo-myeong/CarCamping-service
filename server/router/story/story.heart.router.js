import express from "express";
import * as storyHeartController from "../../controller/story/story.heart.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.get("/stories", isAuth, storyHeartController.getStoryWithHeart);
router.get("/:storyId", isAuth, storyHeartController.getHeart);
router.post("/", isAuth, storyHeartController.createHeart);
router.delete("/:storyId", isAuth, storyHeartController.deleteHeart);

export default router;
