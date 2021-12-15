import express from "express";
import { body } from "express-validator";
import * as authController from "../../controller/auth/auth.controller.js";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";

const router = express.Router();

const validateAuth = [
  body("email").isEmail(),
  body("name").notEmpty(),
  body("password").notEmpty().isLength({ min: 6 }),
  validate,
];

router.post("/signup", validateAuth, authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", isAuth, authController.me);

export default router;
