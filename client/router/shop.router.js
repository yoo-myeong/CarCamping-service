import epxress from "express";
import multer from "multer";
import * as shopController from "../controller/shop/shop.contorller.js";

const uploads_temp = multer({ dest: "uploads/shop/shop_temp" }).array("shopImg", 5);

const router = epxress.Router();

router.get("/", shopController.renderBoardPage);

router.get("/post", shopController.renderPostPage);

router.post("/post", uploads_temp, shopController.postShop);

router.get("/detail/:id", shopController.rederDeatilPage);

router.delete("/:id", shopController.deleteShop);

export default router;
