import express from "express";
import * as storyController from "../controller/story.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", storyController.getStory);
router.post("/", isAuth, storyController.createStory);
router.put("/:id", isAuth, storyController.updateStory);
router.delete("/:id", isAuth, storyController.deleteStory);

export default router;
