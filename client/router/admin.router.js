import epxress from "express";
import * as nodeFetch from "../fetch/nodeFetch.js";
import { config } from "../config.js";

const router = epxress.Router();

router.get("/", async (req, res) => {
  const token = req.cookies["token"];
  const response = await nodeFetch.fetchGetApiWithToken(
    config.backendURL + "/auth/admin",
    token
  );
  if (response.status === 200) res.render("main/admin.ejs");
  else res.sendStatus(403);
});

export default router;
