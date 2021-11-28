import express from "express";
import { body } from "express-validator";
import * as storyController from "../controller/story/story.controller.js";
import * as storyHeartController from "../controller/story/story_heart.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateStory = [
  body("title").notEmpty(),
  body("address").notEmpty(),
  validate,
];

router.get("/", storyController.getStory);
router.get("/:id", storyController.getStoryById);
router.post("/", validateStory, isAuth, storyController.createStory);
router.put("/:id", isAuth, validateStory, storyController.updateStory);
router.delete("/:id", isAuth, storyController.deleteStory);

router.get("/author/:id", isAuth, storyController.checkAuthor);

router.get("/heart/:storyId", isAuth, storyHeartController.getHeart);
router.post("/heart", isAuth, storyHeartController.createHeart);
router.delete("/heart/:storyId", isAuth, storyHeartController.deleteHeart);

export default router;
