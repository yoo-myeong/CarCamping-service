import httpMocks from "node-mocks-http";
import { validate } from "../validator.js";
import * as validator from "express-validator";

jest.mock("express-validator");

describe("validate middleware", () => {
  it("calls next if no error at validation", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    validator.validationResult = jest.fn(() => ({
      isEmpty: () => true,
    }));

    validate(req, res, next);

    expect(next).toBeCalled();
  });

  it("returns 400 when validate error occurs", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    validator.validationResult = jest.fn(() => ({
      isEmpty: () => false,
      array: () => [{ msg: "Error!" }],
    }));

    validate(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().msg).toBe("Error!");
  });
});
