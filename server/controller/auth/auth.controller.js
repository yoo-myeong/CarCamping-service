import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";
import * as authData from "../../data/auth/auth.data.js";
import "express-async-errors";

authData.getUserByEmail(config.admin.email).then((result) => {
  if (!result) {
    const hashedPassword = bcrypt.hashSync(config.admin.password, config.bcrypt.saltRound);
    try {
      authData.createAdmin(hashedPassword);
    } catch (e) {
      throw new Error(`관리자 계정 생성 오류\n${e}`);
    }
  }
});

const ONE_DAY_TO_MS = 86400000;

function createToken(id) {
  const token = jwt.sign({ id }, config.jwt.screatKey, {
    expiresIn: ONE_DAY_TO_MS,
  });
  return token;
}

function setToken(res, token) {
  const options = {
    domain: config.domain,
    path: "/",
    maxAge: ONE_DAY_TO_MS,
    httpOnly: true,
  };
  res.cookie("token", token, options);
}

export async function signup(req, res, next) {
  const { email, password, name } = req.body;
  try {
    const emailUser = await authData.getUserByEmail(email);
    if (emailUser) {
      return res.status(409).json({ message: "this email is alreay registered" });
    }
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRound);
    await authData.createUser(email, hashedPassword, name);
    return res.sendStatus(201);
  } catch (e) {
    throw new Error(`계정생성 중 오류\n${e}`);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  const invalidMessage = { message: "wrong email or wrong password" };
  try {
    const emailUser = await authData.getUserByEmail(email);
    if (!emailUser) return res.status(401).json(invalidMessage);
    const user = emailUser.toJSON();
    const bcryptResult = await bcrypt.compare(password, user.password);
    if (!bcryptResult) {
      return res.status(401).json(invalidMessage);
    }
    const token = createToken(user.id);
    setToken(res, token);
    return res.status(202).json({ token, username: user.name });
  } catch (e) {
    throw new Error(`이메일 유저 가져오기 실패\n${e}`);
  }
}

export async function me(req, res, next) {
  try {
    console.log(req.userId);
    const user = await authData.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "invalid token" });
    }
    return res.status(200).json({ username: user.name });
  } catch (e) {
    throw new Error(`id 유저 찾기 실패\n${e}`);
  }
}

export async function logout(req, res, next) {
  setToken(res, "");
  res.sendStatus(200);
}

export async function admin(req, res, next) {
  try {
    const user = await authData.findById(req.userId);
    if (!user || user.email !== config.admin.email) {
      return res.status(401).json({ message: "forbidden token" });
    }
    return res.status(200).json({ token: req.token, username: user.name });
  } catch (e) {
    throw new Error(`id 유저 가져오기 실패\n${e}`);
  }
}
