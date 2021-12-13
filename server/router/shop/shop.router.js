import express from "express";
import { body } from "express-validator";
import * as shopController from "../../controller/shop/shop.controller.js";
import shopReplyRoutes from "./shop.reply.router.js";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";

const router = express.Router();

const validateShop = [
  body("stuff").notEmpty(),
  body("price").notEmpty(),
  body("mobile").notEmpty(),
  body("description").notEmpty(),
  body("transaction").notEmpty(),
  validate,
];

router.get("/", shopController.getShop);
router.get("/:id", shopController.getShopById);
router.post("/", validateShop, isAuth, shopController.createShop);
router.delete("/:id", isAuth, shopController.deleteShop);

router.use("/reply", shopReplyRoutes);

export default router;