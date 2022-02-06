import express from "express";
import { body } from "express-validator";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";
import * as authController from "../../controller/auth/auth.controller.js";

const router = express.Router();

const validateAuth = [
  body("email").notEmpty().isEmail(),
  body("name").notEmpty(),
  body("password").notEmpty().isLength({ min: 6, max: 15 }),
  validate,
];

router.post("/signup", validateAuth, authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", isAuth, authController.me);
router.get("/admin", isAuth, authController.admin);

export default router;
