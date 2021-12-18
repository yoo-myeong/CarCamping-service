import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as authData from "../data/auth/auth.data.js";

export async function isAuth(req, res, next) {
  // 브라우저는 쿠키로 전송하지만 모바일은 헤더로 보내므로 두 가지를 검사해서 토큰 할당
  let token;
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies["token"];
  }

  if (!token) {
    console.log("no token");
    return res.sendStatus(401);
  }

  jwt.verify(token, config.jwt.screatKey, async (err, decode) => {
    if (err) {
      console.error(err);
      console.log(`${token} is invalid token`);
      return res.sendStatus(401);
    }
    const user = await authData.findById(decode.id);
    if (!user) {
      console.log("no user");
      return res.sendStatus(401);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
}
