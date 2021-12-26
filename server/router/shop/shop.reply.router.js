import express from "express";
import * as shopReplyController from "../../controller/shop/shop.reply.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.get("/:id", shopReplyController.getAllShopReply);
router.post("/", isAuth, shopReplyController.createShopReply);

export default router;
