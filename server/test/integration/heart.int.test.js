import supertest from "supertest";
import faker from "faker";
import { startServer, stopServer } from "../../app.js";
import { createNewUserAccount, getToken } from "../utils/auth_utils.js";
import { creatingStory, testInvalidToken } from "../utils/story_utils.js";

describe("heart APIs", () => {
  let server;
  let request;
  let story;
  jest.setTimeout(20000);

  beforeAll(async () => {
    server = await startServer();
    request = supertest(server);
  });

  afterAll(async () => {
    await stopServer(server);
  });

  beforeEach(() => {
    story = {
      title: faker.random.word(),
      address: faker.address.streetAddress(true),
      campsite: faker.internet.url(),
      description: faker.random.words(5),
    };
  });

  describe("GET /stories", () => {
    const url = "/heart/stories";

    it("returns 401 when token is not valid", async () => {
      testInvalidToken(request, url, "get");
    });

    it("returns 200 with story Array ordered by heart count", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);

      const res = await request.get(url).set("Cookie", [`token=${token};`]);
      const isArray = Array.isArray(res.body);

      expect(res.statusCode).toBe(200);
      expect(isArray).toBe(true);
    });
  });

  describe("POST /", () => {
    const url = "/heart";

    it("returns 401 when token is not valid", async () => {
      testInvalidToken(request, url, "post");
    });

    it("returns 201 with created heart object including heart count", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const responseCreatingStory = await creatingStory(request, story);
      const storyId = responseCreatingStory.body.storyId;

      const res = await request
        .post(url)
        .set("Cookie", [`token=${token};`])
        .send({ storyId });

      expect(res.statusCode).toBe(201);
      expect(res.body["heartCnt"]).toBe(1);
    });
  });

  describe("GET /:storyId", () => {
    const url = "/heart/";

    it("returns 401 when token is not valid", async () => {
      testInvalidToken(request, url + "1", "get");
    });

    it("returns 201 with object including heartCnt and IsHeartUser", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const responseCreatingStory = await creatingStory(request, story);
      const storyId = responseCreatingStory.body.storyId;

      const res = await request.get(url + storyId).set("Cookie", [`token=${token};`]);

      expect(res.statusCode).toBe(200);
      expect(res.body["IsHeartUser"]).not.toBe(undefined);
      expect(res.body["heartCnt"]).not.toBe(undefined);
    });
  });

  describe("DELETE /:storyId", () => {
    const url = "/heart/";

    it("returns 401 when token is not valid", async () => {
      testInvalidToken(request, url + "1", "delete");
    });

    it("returns 200 with deleted heart object including heart count", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const responseCreatingStory = await creatingStory(request, story);
      const storyId = responseCreatingStory.body.storyId;

      await request
        .post("/heart")
        .set("Cookie", [`token=${token};`])
        .send({ storyId });
      const res = await request.delete(url + storyId).set("Cookie", [`token=${token};`]);

      expect(res.statusCode).toBe(200);
      expect(res.body["heartCnt"]).toBe(0);
    });
  });
});
