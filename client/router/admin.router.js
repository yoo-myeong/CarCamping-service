import epxress from "express";
import * as nodeFetch from "../fetch/nodeFetch.js";
import { config } from "../config.js";

const router = epxress.Router();

router.get("/", async (req, res) => {
  const token = req.cookies["token"];
  const http = new nodeFetch.HttpClient();
  try {
    await http.fetch("/auth/admin", {
      method: "GET",
      headers: {
        cookie: `token=${token}`,
      },
    });
    res.render("main/admin.ejs");
  } catch {
    res.sendStatus(403);
  }
});

export default router;
