import epxress from "express";
import multer from "multer";
import methodOverride from "method-override";
import * as storyController from "../controller/story/story.controller.js";

const router = epxress.Router();
router.use(methodOverride("_method"));

const uploads_to_temp = multer({ dest: "uploads/story/storyImg_temp" }).array(
  "storyImg",
  5
);

router.get("/", storyController.rederBoarePage);

router.get("/detail/:id", storyController.renderDetailPage);

router.get("/post", storyController.renderPostPage);

router.post("/", uploads_to_temp, storyController.postStory);

router.get("/update/:id", storyController.renderUpdatePage);

router.put("/:id", uploads_to_temp, storyController.updateStory);

router.delete("/:id", storyController.deleteStory);

router.get("/search/:address", storyController.searchAddress);

export default router;
