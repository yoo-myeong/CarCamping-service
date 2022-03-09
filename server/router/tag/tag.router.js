import express from "express";
import * as tagController from "../../controller/tag/tag.controller.js";

const router = express.Router();

router.get("/", tagController.getAllTags);
router.delete("/:name", tagController.deleteTags);
router.post("/", tagController.creatTag);

export default router;
