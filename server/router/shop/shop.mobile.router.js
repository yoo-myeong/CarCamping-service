import express from "express";
import * as shopMobileController from "../../controller/shop/shop.mobile.controller.js";
import { isAuth } from "../../middleware/isAuth.js";

const router = express.Router();

router.get("/:shopId", isAuth, shopMobileController.getMobileAccessById);
router.post("/:shopId", isAuth, shopMobileController.createMobileAccess);

export default router;
