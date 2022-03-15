import supertest from "supertest";
import faker from "faker";
import { startServer, stopServer } from "../../app.js";
import { createNewUserAccount, getToken, makeValidUserDetails } from "../utils/auth_utils.js";

describe("auth APIs", () => {
  let server;
  let request;
  beforeAll(async () => {
    server = await startServer();
    request = supertest(server);
  });

  afterAll(async () => {
    await stopServer(server);
  });

  describe("POST /auth/signup", () => {
    const url = "/auth/signup";

    it("returns 201 and token when user details are vaild", async () => {
      const user = makeValidUserDetails();

      const res = await request.post(url).send(user);

      expect(res.statusCode).toBe(201);
    });

    it("returns 409 when email already exists", async () => {
      const user = makeValidUserDetails();
      const res1 = await request.post(url).send(user);
      expect(res1.statusCode).toBe(201);

      const res2 = await request.post(url).send(user);

      expect(res2.statusCode).toBe(409);
      expect(res2.body.msg).toBe("this email is alreay registered");
    });

    test.each([{ filedname: "email" }, { filedname: "name" }, { filedname: "password" }])(
      `returns 400 when $filedname is missing`,
      async ({ filedname }) => {
        const user = makeValidUserDetails();
        delete user[filedname];

        const res = await request.post(url).send(user);

        expect(res.statusCode).toBe(400);
      }
    );
  });

  describe("POST /auth/login", () => {
    const url = "/auth/login";

    it("returns 200 and token when user credentails are valid", async () => {
      const user = await createNewUserAccount(request);

      const res = await request.post(url).send({
        email: user.email,
        password: user.password,
      });

      expect(res.statusCode).toBe(202);
    });

    it("returns 401 when email is not found", async () => {
      const randomEmail = faker.random.alpha({ count: 16 });

      const res = await request.post(url).send({
        email: randomEmail,
        password: faker.internet.password(10),
      });

      expect(res.statusCode).toBe(401);
    });

    it("returns 401 when password is incorrect", async () => {
      const user = await createNewUserAccount(request);
      const new_pw = faker.random.alphaNumeric(32);

      const res = await request.post(url).send({
        email: user.email,
        password: new_pw,
      });

      expect(res.statusCode).toBe(401);
    });
  });

  describe("GET /auth/me", () => {
    const url = "/auth/me";

    it("returns 200 when token is valid", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);

      const res = await request.get(url).set("Cookie", [`token=${token};`]);

      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe(user.name);
    });

    it("returns 401 when token is valid", async () => {
      const token = undefined;

      const res = await request.get(url).set("Cookie", [`token=${token};`]);

      expect(res.statusCode).toBe(401);
      expect(res.body.msg).toBe("유효하지 않은 jwt");
    });
  });

  describe("POST /auth/logoout", () => {
    const url = "/auth/logout";

    it("returns 200 for the logout request", async () => {
      const res = await request.post(url);

      expect(res.statusCode).toBe(200);
    });
  });
});
