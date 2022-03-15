import express from "express";
import { body } from "express-validator";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";

const router = express.Router();

const validateStory = [
  body("title").notEmpty().isString(),
  body("address").notEmpty().isString(),
  body("campsite").notEmpty().isString(),
  body("description").notEmpty().isString(),
  validate,
];

export default function storyRouter(storyController) {
  router.post("/", isAuth, validateStory, storyController.createStory);
  router.get("/", storyController.getStory);
  router.get("/author/:id", isAuth, storyController.authorize);
  router.get("/:id", storyController.getStoryById);
  router.put("/:id", isAuth, validateStory, storyController.updateStory);
  router.delete("/:id", isAuth, storyController.deleteStory);

  return router;
}
