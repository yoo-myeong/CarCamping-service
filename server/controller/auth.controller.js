import * as authData from "../data/auth.data.js";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import "express-async-errors";
import jwt from "jsonwebtoken";

function createToken(id) {
  const token = jwt.sign({ id }, config.jwt.screatKey, {
    expiresIn: "1d",
  });
  return token;
}

export async function signup(req, res, next) {
  const { email, password, name } = req.body;
  const emailFromDB = await authData.getUserByEmail(email);
  if (emailFromDB) {
    return res.status(409).json({ message: "this email is alreay registered" });
  }
  const hasedPassword = await bcrypt.hash(password, config.bcrypt.saltRound);
  const data = await authData.createUser(email, hasedPassword, name);
  const newUser = data.toJSON();
  const token = createToken(newUser.id);
  console.log(token);
  res.status(201).json({ name: newUser.name, token });
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  const data = await authData.getUserByEmail(email);
  if (!data)
    return res.status(401).json({ message: "wrong email or wrong password" });
  const user = data.toJSON();
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(401).json({ message: "wrong email or wrong password" });
  }
  const token = createToken(user.id);
  res.status(202).json({ token, name: user.name });
}

export async function me(req, res, next) {
  const user = await authData.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: "invalid token" });
  }
  res.status(200).json({ token: req.token, name: user.name });
}
