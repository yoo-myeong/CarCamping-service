import faker from "faker";
import httpMocks from "node-mocks-http";
import { StoryController } from "./story.controller.js";

describe("StoryController", () => {
  let storyController;
  let storyRepository;
  beforeEach(() => {
    storyRepository = {};
    storyController = new StoryController(storyRepository);
  });

  describe("createStory", () => {
    it("returns 201 with storyId", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const storyId = faker.random.alphaNumeric(32);
      storyRepository.create = (payload, userId) => storyId;

      await storyController.createStory(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toMatchObject({ storyId });
    });
  });

  describe("getStory", () => {
    let req, res, userId;
    beforeEach(() => {
      userId = faker.random.alphaNumeric(32);
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
    });

    it("returns stories for the given user when username is provided", async () => {
      const username = faker.internet.userName();
      req.query = { username };
      const stories = [{ id: faker.random.alphaNumeric(32) }];
      storyRepository.getByusername = () => stories;

      await storyController.getStory(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(stories);
    });

    it("returns stories for the given address when search is provided", async () => {
      const search = faker.address.streetAddress();
      req.query = { search };
      const stories = [{ id: faker.random.alphaNumeric(32) }];
      storyRepository.getByAddress = () => stories;

      await storyController.getStory(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(stories);
    });

    it("returns all stories", async () => {
      const stories = [{ id: faker.random.alphaNumeric(32) }];
      storyRepository.getAll = () => stories;

      await storyController.getStory(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(stories);
    });
  });

  describe("getStoryById", () => {
    it("returns stories for the id when id is provided", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const stories = [{ id: faker.random.alphaNumeric(32) }];
      storyRepository.getStoryById = jest.fn((id) => stories);

      await storyController.getStoryById(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(stories);
    });
  });

  describe("updateStory", () => {
    let req, res, id, title, userId;
    beforeEach(() => {
      id = faker.random.alphaNumeric(32);
      title = faker.random.words(5);
      userId = faker.random.alphaNumeric(32);
      req = httpMocks.createRequest({
        params: { id },
        body: { title },
        userId,
      });
      res = httpMocks.createResponse();
    });

    it("returns 404 if the story doesn't exist", async () => {
      storyRepository.getUserIdById = async (id) => undefined;

      await storyController.updateStory(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData().msg).toBe(`there's no story of which id is ${id}`);
    });

    it("returns 403 if userIds are diffrent", async () => {
      storyRepository.getUserIdById = async (id) => {
        return { userId: faker.random.alphaNumeric(32) };
      };

      await storyController.updateStory(req, res);

      expect(res.statusCode).toBe(403);
      expect(res._getJSONData().msg).toBe("not allowed to update this story");
    });

    it("returns 200 with story object including storyId", async () => {
      const storyId = faker.random.alphaNumeric(32);
      storyRepository.getUserIdById = async (id) => {
        return { userId };
      };
      storyRepository.update = async (id, body) => storyId;

      await storyController.updateStory(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ storyId });
    });
  });

  describe("deleteStory", () => {
    let req, res, id, userId;
    beforeEach(() => {
      id = faker.random.alphaNumeric(32);
      userId = faker.random.alphaNumeric(32);
      req = httpMocks.createRequest({
        params: { id },
        userId,
      });
      res = httpMocks.createResponse();
    });

    it("returns 404 if story dosen't exist", async () => {
      storyRepository.getUserIdById = async (id) => undefined;

      await storyController.deleteStory(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData().msg).toBe(`there's no story that id is ${id}`);
    });

    it("returns 403 if userIds are diffrent", async () => {
      storyRepository.getUserIdById = async (id) => {
        return { userId: faker.random.alphaNumeric(32) };
      };

      await storyController.deleteStory(req, res);

      expect(res.statusCode).toBe(403);
      expect(res._getJSONData().msg).toBe("you're not allowed to delete this story");
    });

    it("returns 204 for delete request", async () => {
      storyRepository.getUserIdById = async (id) => {
        return { userId };
      };
      storyRepository.destroy = async (id, body) => {};

      await storyController.deleteStory(req, res);

      expect(res.statusCode).toBe(204);
    });
  });

  describe("authorize", () => {
    let req, res, id, userId;
    beforeEach(() => {
      id = faker.random.alphaNumeric(32);
      userId = faker.random.alphaNumeric(32);
      req = httpMocks.createRequest({
        params: { id },
        userId,
      });
      res = httpMocks.createResponse();
    });

    it("returns 200 if userIds are same", async () => {
      storyRepository.getUserIdById = async (id) => {
        return { userId };
      };

      await storyController.authorize(req, res);

      expect(res.statusCode).toBe(200);
    });

    it("returns 401 if userIds are diffrent", async () => {
      storyRepository.getUserIdById = async (id) => {
        return { userId: faker.random.alphaNumeric(32) };
      };

      await storyController.authorize(req, res);

      expect(res.statusCode).toBe(401);
    });
  });
});
