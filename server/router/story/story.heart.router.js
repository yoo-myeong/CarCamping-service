import express from "express";
import { body } from "express-validator";
import * as storyHeartController from "../../controller/story/story.heart.controller.js";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";

const router = express.Router();

router.get("/:storyId", isAuth, storyHeartController.getHeart);
router.post("/", isAuth, storyHeartController.createHeart);
router.delete("/:storyId", isAuth, storyHeartController.deleteHeart);

export default router;
