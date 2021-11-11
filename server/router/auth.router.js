import express from "express";
import * as authController from "../controller/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", isAuth, authController.me);

export default router;
