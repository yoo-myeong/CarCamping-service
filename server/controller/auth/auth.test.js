import faker, { fake } from "faker";
import httpMocks from "node-mocks-http";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthController } from "./auth.controller.js";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("AuthController", () => {
  let authController;
  let authRepository;
  const token = faker.random.alphaNumeric(128);
  jwt.sign = jest.fn((data, key, option) => token);
  beforeEach(() => {
    authRepository = {};
    authController = new AuthController(authRepository);
  });

  describe("signup", () => {
    let req, res, user;
    beforeEach(() => {
      user = {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      };
      req = httpMocks.createRequest({
        body: {
          ...user,
          password: faker.internet.password(),
        },
      });
      res = httpMocks.createResponse();
    });

    it("returns 409 if user dosen't exist", async () => {
      authRepository.findByEmail = async (email) => user;

      await authController.signup(req, res);

      expect(res.statusCode).toBe(409);
      expect(res._getJSONData().msg).toBe("this email is alreay registered");
    });

    it("returns 201 after create user", async () => {
      const hashed = faker.random.alphaNumeric(128);
      bcrypt.hash = jest.fn(async (pw, saltRount) => hashed);
      authRepository.findByEmail = (email) => undefined;
      authRepository.create = (email, pw, name) => {};

      await authController.signup(req, res);

      expect(res.statusCode).toBe(201);
    });
  });

  describe("login", () => {
    let req, res, user;
    beforeEach(() => {
      user = {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      };
      req = httpMocks.createRequest({
        body: {
          email: user.email,
          password: faker.internet.password(),
        },
      });
      res = httpMocks.createResponse();
    });

    it("returns 401 if user dosen't exist", async () => {
      authRepository.findByEmail = async (email) => undefined;

      await authController.login(req, res);

      expect(res.statusCode).toBe(401);
      expect(res._getJSONData().msg).toBe("wrong email or wrong password");
    });

    it("returns 401 when bcrypt comparing fails", async () => {
      authRepository.findByEmail = async (email) => {
        return {
          email: user.email,
          name: user.name,
        };
      };
      bcrypt.compare = jest.fn((pw, hashed) => false);

      await authController.login(req, res);

      expect(res.statusCode).toBe(401);
      expect(res._getJSONData().msg).toBe("wrong email or wrong password");
    });

    it("returns 202 with json data including token and username", async () => {
      authRepository.findByEmail = async (email) => {
        return {
          id: faker.random.alphaNumeric(16),
          email: user.email,
          name: user.name,
        };
      };
      bcrypt.compare = jest.fn((pw, hashed) => true);

      await authController.login(req, res);

      expect(res.statusCode).toBe(202);
      expect(res._getJSONData()).toEqual({ token, username: user.name });
      expect(res.cookies.token.value).toBe(token);
    });
  });

  describe("me", () => {
    let req, res, user;
    const userId = faker.random.alphaNumeric(16);
    beforeEach(() => {
      user = {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      };
      req = httpMocks.createRequest({
        userId,
      });
      res = httpMocks.createResponse();
    });

    it("returns 401 for the request including invalid token", async () => {
      authRepository.findById = async (id) => undefined;

      await authController.me(req, res);

      expect(res.statusCode).toBe(401);
      expect(res._getJSONData().msg).toBe("invalid token");
    });

    it("returns 200 for the request including valid token", async () => {
      authRepository.findById = async (id) => user;

      await authController.me(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({ username: user.name });
    });
  });

  describe("logout", () => {
    it("calls setToken and returns 200", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      await authController.logout(req, res);

      expect(res.statusCode).toBe(200);
    });
  });
});
