import express from "express";
import * as taglistController from "../../controller/taglist/taglist.controller.js";

const router = express.Router();

router.get("/", taglistController.getAllTags);
router.delete("/:name", taglistController.deleteTags);
router.post("/", taglistController.creatTag);

export default router;
