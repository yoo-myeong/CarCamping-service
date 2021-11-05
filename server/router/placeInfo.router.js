import express from "express";
import "express-async-errors";
import * as placeInfoController from "../controller/placeInfo.controller.js";

const router = express.Router();
router.get("/", placeInfoController.getAllPost);

export default router;
