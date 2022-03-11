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
      return res.status(401).json({ msg: "유효하지 않은 jwt" });
    }
    const user = await authData.findById(decode.id);
    if (!user) {
      return res.status(401).json({ msg: "존재하지 않는 유저" });
    }
    req.email = user.email;
    req.userId = user.id;
    req.token = token;
    next();
  });
}
