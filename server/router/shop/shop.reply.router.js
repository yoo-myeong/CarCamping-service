import express from "express";
import * as shopReplyController from "../../controller/shop/shopReply.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.get("/:shopId", shopReplyController.getAllShopReply);
router.post("/", isAuth, shopReplyController.createShopReply);

export default router;
