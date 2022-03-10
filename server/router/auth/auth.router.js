import express from "express";
import { body } from "express-validator";
import { isAuth } from "../../middleware/isAuth.js";
import { validate } from "../../middleware/validator.js";

const router = express.Router();

const validateAuth = [
  body("email").trim().notEmpty().isEmail(),
  body("name").trim().notEmpty(),
  body("password").trim().notEmpty().isLength({ min: 6, max: 15 }),
  validate,
];

export default function authRouter(authController) {
  router.post("/signup", validateAuth, authController.signup);
  router.post("/login", authController.login);
  router.post("/logout", authController.logout);
  router.get("/me", isAuth, authController.me);

  return router;
}
