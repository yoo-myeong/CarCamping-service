import supertest from "supertest";
import faker from "faker";
import { startServer, stopServer } from "../../app.js";
import { allStroy } from "../data/all-story.js";
import { createNewUserAccount, getToken } from "../utils/auth_utils.js";

describe("story APIs", () => {
  let stories;
  let server;
  let request;
  const deleteFiledName = [
    { filedname: "title" },
    { filedname: "address" },
    { filedname: "campsite" },
    { filedname: "description" },
  ];
  jest.setTimeout(30000);

  beforeAll(async () => {
    server = await startServer();
    request = supertest(server);
  });

  afterAll(async () => {
    await stopServer(server);
  });

  describe("POST /", () => {
    const url = "/story";
    beforeEach(() => {
      stories = getNewStories();
    });

    it("returns 401 when token is not valid", async () => {
      await testInvalidToken(url, "post");
    });

    test.each(deleteFiledName)(`returns 400 when $filedname is missing`, async ({ filedname }) => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const story = { ...stories[0] };
      delete story[filedname];

      const res = await request
        .post(url)
        .set("Cookie", [`token=${token};`])
        .send(story);

      expect(res.statusCode).toBe(400);
    });

    it("returns 201 with object including storyId", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const story = { ...stories[0] };

      const res = await request
        .post(url)
        .set("Cookie", [`token=${token};`])
        .send(story);

      expect(res.statusCode).toBe(201);
      expect(res.body.storyId).not.toBe(undefined);
    });
  });

  describe("GET /", () => {
    const url = "/story";
    let user1, user2, token1, token2;

    beforeEach(async () => {
      stories = getNewStories();
      user1 = await createNewUserAccount(request);
      user2 = await createNewUserAccount(request);
      token1 = await getToken(request, user1);
      token2 = await getToken(request, user2);

      const res1 = await request
        .post(url)
        .set("Cookie", [`token=${token1};`])
        .send(stories[0]);
      const res2 = await request
        .post(url)
        .set("Cookie", [`token=${token2};`])
        .send(stories[1]);

      expect(res1.statusCode).toBe(201);
      expect(res1.body.storyId).not.toBe(undefined);
      expect(res2.statusCode).toBe(201);
      expect(res2.body.storyId).not.toBe(undefined);
    });

    it("returns 200 and story object of the given username", async () => {
      const res = await request.get(url + "/?username=" + user1.name);

      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toMatchObject({
        title: stories[0].title,
        address: stories[0].address,
      });
    });

    it("returns 200 and story object of the given address", async () => {
      const res = await request.get(url + "/?search=" + stories[0].address);

      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toMatchObject({
        title: stories[0].title,
        address: stories[0].address,
      });
    });

    it("returns 200 and story object ordered by desc", async () => {
      const res = await request.get(url + "/?sort=desc");

      const date1 = new Date(res.body[0].createdAt);
      const date2 = new Date(res.body[1].createdAt);

      expect(res.statusCode).toBe(200);
      expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
    });

    it("returns 200 and story object ordered by asc", async () => {
      const res = await request.get(url);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("GET /author/:id", () => {
    const url = "/story/author/";
    beforeEach(() => {
      stories = getNewStories();
    });

    it("returns 401 when token is not valid", async () => {
      testInvalidToken(url + "1", "get");
    });

    it("returns 401 when userIds are diffrent", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const res1 = await creatingStory();
      const storyId = res1.body.storyId;

      const res2 = await request.get(url + storyId).set("Cookie", [`token=${token};`]);

      expect(res2.statusCode).toBe(401);
    });
  });

  describe("GET /:id", () => {
    const url = "/story";
    beforeEach(() => {
      stories = getNewStories();
    });

    it("returns 200 with story object of given id", async () => {
      const story = await creatingStory();
      const id = story.body.storyId;

      const res = await request.get(url + "/" + id);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(id);
    });
  });

  describe("PUT /:id", () => {
    const url = "/story/";
    beforeEach(() => {
      stories = getNewStories();
    });

    it("returns 401 when token is not valid", () => {
      testInvalidToken(url + "1", "put");
    });

    test.each(deleteFiledName)(`returns 400 when $filedname is missing`, async ({ filedname }) => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const story = await creatingStory();
      const id = story.body.storyId;
      const newStory = { ...stories[0] };
      delete newStory[filedname];

      const res = await request
        .put(url + id)
        .set("Cookie", [`token=${token};`])
        .send(newStory);

      expect(res.statusCode).toBe(400);
    });

    it("returns 403 when userIds are diffrent", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const res1 = await creatingStory();
      const storyId = res1.body.storyId;

      const res2 = await request
        .put(url + storyId)
        .set("Cookie", [`token=${token};`])
        .send(stories[0]);

      expect(res2.statusCode).toBe(403);
    });

    it("returns 200 and object including storyId when story is updated", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const story = { ...stories[0] };
      const res = await request
        .post("/story")
        .set("Cookie", [`token=${token};`])
        .send(story);
      const storyId = res.body.storyId;

      const res2 = await request
        .put(url + storyId)
        .set("Cookie", [`token=${token};`])
        .send(stories[0]);

      expect(res.statusCode).toBe(201);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.storyId).toBe(storyId.toString());
    });
  });

  describe("DELETE /:id", () => {
    const url = "/story/";
    beforeEach(() => {
      stories = getNewStories();
    });

    it("returns 401 when token is not valid", () => {
      testInvalidToken(url + "1", "delete");
    });

    it("returns 404 if story of given id dosen't exist", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const id = faker.datatype.number();

      const res = await request.delete(url + id).set("Cookie", [`token=${token};`]);

      expect(res.statusCode).toBe(404);
    });

    it("returns 403 when userIds are diffrent", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const res1 = await creatingStory();
      const storyId = res1.body.storyId;

      const res2 = await request
        .delete(url + storyId)
        .set("Cookie", [`token=${token};`])
        .send(stories[0]);

      expect(res2.statusCode).toBe(403);
    });

    it("returns 204 when story is deleted", async () => {
      const user = await createNewUserAccount(request);
      const token = await getToken(request, user);
      const story = { ...stories[0] };
      const res = await request
        .post("/story")
        .set("Cookie", [`token=${token};`])
        .send(story);
      const storyId = res.body.storyId;

      const res2 = await request.delete(url + storyId).set("Cookie", [`token=${token};`]);

      expect(res.statusCode).toBe(201);
      expect(res2.statusCode).toBe(204);
    });
  });

  async function testInvalidToken(url, method) {
    const token = undefined;

    const res = await request[method](url).set("Cookie", [`token=${token};`]);

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("유효하지 않은 jwt");
  }

  function getNewStories() {
    let stories = [];
    allStroy.forEach((story) => {
      stories.push({ ...story });
    });
    return stories;
  }

  async function creatingStory() {
    const user = await createNewUserAccount(request);
    const token = await getToken(request, user);
    const story = { ...stories[0] };

    const res = await request
      .post("/story")
      .set("Cookie", [`token=${token};`])
      .send(story);

    return res;
  }
});
