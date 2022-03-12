import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";
import "express-async-errors";

export class AuthController {
  ONE_DAY_TO_MS = 86400000;
  constructor(authRepository) {
    this.auth = authRepository;
  }

  createToken(id) {
    const token = jwt.sign({ id }, config.jwt.screatKey, {
      expiresIn: this.ONE_DAY_TO_MS,
    });
    return token;
  }

  setToken(res, token) {
    const options = {
      domain: config.domain,
      path: "/",
      maxAge: this.ONE_DAY_TO_MS,
      httpOnly: true,
    };
    res.cookie("token", token, options);
  }

  signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const data = await this.auth.findByEmail(email);
      if (data) {
        return res.status(409).json({ msg: "this email is alreay registered" });
      }
      const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRound);
      await this.auth.create(email, hashedPassword, name);
      return res.sendStatus(201);
    } catch (e) {
      throw new Error(`계정생성 중 오류\n${e}`);
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const invalidMessage = { msg: "wrong email or wrong password" };
    try {
      const user = await this.auth.findByEmail(email);
      if (!user) return res.status(401).json(invalidMessage);
      const bcryptResult = await bcrypt.compare(password, user.password);
      if (!bcryptResult) {
        return res.status(401).json(invalidMessage);
      }
      const token = this.createToken(user.id);
      this.setToken(res, token);
      return res.status(202).json({ token, username: user.name });
    } catch (e) {
      throw new Error(`이메일 유저 가져오기 실패\n${e}`);
    }
  };

  me = async (req, res) => {
    try {
      const user = await this.auth.findById(req.userId);
      if (!user) {
        return res.status(401).json({ msg: "invalid token" });
      }
      return res.status(200).json({ username: user.name });
    } catch (e) {
      throw new Error(`id 유저 찾기 실패\n${e}`);
    }
  };

  logout = async (req, res) => {
    this.setToken(res, "");
    res.sendStatus(200);
  };
}
