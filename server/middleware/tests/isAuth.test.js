import httpMocks from "node-mocks-http";
import { isAuth } from "../isAuth.js";
import jwt from "jsonwebtoken";
import * as authData from "../../data/auth/auth.data.js";

jest.mock("jsonwebtoken");
jest.mock("../../data/auth/auth.data.js");

describe("isAuth Middleware", () => {
  it("returns 401 for the request without token", () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/auth/me",
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    isAuth(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(next).not.toBeCalled();
  });

  it("returns 401 for invalid JWT", async () => {
    const token = "testToken";
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/auth/me",
      cookies: { token },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error("bad token"), undefined);
    });

    await isAuth(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData().msg).toBe("유효하지 않은 jwt");
    expect(next).not.toBeCalled();
  });

  it("returns 401 when can't find user by id", async () => {
    const token = "testToken";
    const id = "testId";
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/auth/me",
      cookies: { token },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id });
    });
    authData.findById = jest.fn((id) => Promise.resolve(undefined));

    await isAuth(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData().msg).toBe("존재하지 않는 유저");
    expect(next).not.toBeCalled();
  });

  it("passes a request with valid token", async () => {
    const token = "testToken";
    const id = "testId";
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/auth/me",
      cookies: { token },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id });
    });
    const email = "testEamil";
    authData.findById = jest.fn((id) => Promise.resolve({ email, id }));

    await isAuth(req, res, next);

    expect(req).toMatchObject({ userId: id, token, email });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
