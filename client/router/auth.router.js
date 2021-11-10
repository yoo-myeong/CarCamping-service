import epxress from "express";
import fetch from "node-fetch";

const router = epxress.Router();

router.get("/signup", (req, res, next) => {
  res.status(200).render("auth/signup.ejs");
});

router.get("/login", (req, res, next) => {
  res.status(200).render("auth/login.ejs");
});

export default router;
