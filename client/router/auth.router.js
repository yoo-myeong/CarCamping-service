import epxress, { response } from "express";
import { config } from "../config.js";
import * as authService from "../service/auth.service.js";
const router = epxress.Router();

router.get("/signup", (req, res, next) => {
  res
    .status(200)
    .render("auth/signup.ejs", { visited: false, passwordFail: false });
});

router.post("/signup", async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  console.log(req.body);
  if (password !== password2) {
    return res.render("auth/signup.ejs", {
      visited: false,
      passwordFail: true,
    });
  }
  const url = config.backend_server + "/auth/signup";
  const response = await authService.fetchPostApi(url, {
    name,
    email,
    password,
  });
  const status = response.status;
  const json = await response.json();
  if (status === 409) {
    return res.render("auth/signup.ejs", {
      visited: true,
      passwordFail: false,
    });
  }
  res.redirect("/");
});

router.get("/login", (req, res, next) => {
  res.status(200).render("auth/login.ejs");
});

export default router;
