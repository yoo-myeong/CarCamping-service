import * as authData from "../../data/auth/auth.data.js";
import bcrypt from "bcrypt";
import { config } from "../../config.js";
import "express-async-errors";
import jwt from "jsonwebtoken";

const createAdminUser = new Promise(() => {
  authData.getUserByEmail(config.admin.email).then((result) => {
    if (!result) {
      const hashedPassword = bcrypt.hashSync(
        config.admin.password,
        config.bcrypt.saltRound
      );
      authData.createAdmin(hashedPassword);
    }
  });
});

function createToken(id) {
  const token = jwt.sign({ id }, config.jwt.screatKey, {
    expiresIn: "1d",
  });
  return token;
}

function setToken(res, token) {
  const ONE_DAY_TO_MS = 86400000;
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
  const emailUser = await authData.getUserByEmail(email);
  if (emailUser) {
    return res.status(409).json({ message: "this email is alreay registered" });
  }
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRound);
  authData.createUser(email, hashedPassword, name);
  res.sendStatus(201);
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  const invalidMessage = { message: "wrong email or wrong password" };
  const emailUser = await authData.getUserByEmail(email);
  if (!emailUser) return res.status(401).json(invalidMessage);
  const user = emailUser.toJSON();
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    return res.status(401).json(invalidMessage);
  }
  const token = createToken(user.id);
  setToken(res, token);
  res.status(202).json({ token, username: user.name });
}

export async function me(req, res, next) {
  const user = await authData.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: "invalid token" });
  }
  res
    .status(200)
    .json({ token: req.token, username: user.name, userId: user.id });
}

export async function logout(req, res, next) {
  res.cookie("token", "");
  res.sendStatus(200);
}

export async function admin(req, res, next) {
  const user = await authData.findById(req.userId);
  if (!user || user.email !== config.admin.email) {
    return res.status(401).json({ message: "forbidden token" });
  }
  res
    .status(200)
    .json({ token: req.token, username: user.name, userId: user.id });
}
