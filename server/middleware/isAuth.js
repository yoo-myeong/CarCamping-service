import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import * as authData from "../data/auth/auth.data.js";

export async function isAuth(req, res, next) {
  let token;
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.jwt.screatKey, async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "jwt 실패" });
    }
    const user = await authData.findById(decode.id);
    if (!user) {
      return res.sendStatus(401);
    }
    req.email = user.email;
    req.userId = user.id;
    req.token = token;
    next();
  });
}
