import express from "express";
import { body } from "express-validator";
import * as storyController from "../../controller/story/story.controller.js";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";
import storyHeartRoutes from "./story.heart.router.js";

const router = express.Router();

const validateStory = [
  body("title").notEmpty(),
  body("address").notEmpty(),
  body("campsite").notEmpty(),
  body("description").notEmpty(),
  validate,
];

router.use("/heart", storyHeartRoutes);
router.get("/", storyController.getStory);
router.get("/:id", storyController.getStoryById);
router.post("/", validateStory, isAuth, storyController.createStory);
router.put("/:id", isAuth, validateStory, storyController.updateStory);
router.delete("/:id", isAuth, storyController.deleteStory);
router.get("/author/:id", isAuth, storyController.checkAuthor);

export default router;
