import epxress from "express";
import * as authController from "../controller/auth/auth.controller.js";

const router = epxress.Router();

router.get("/signup", authController.renderJoinPage);

router.get("/login", authController.renderLoginPage);

export default router;
