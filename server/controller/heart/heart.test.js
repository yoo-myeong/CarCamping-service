import faker from "faker";
import httpMocks from "node-mocks-http";
import { HeartController } from "./heart.controller.js";

describe("HeartController", () => {
  let heartRepository;
  let heartController;
  beforeEach(() => {
    heartRepository = {};
    heartController = new HeartController(heartRepository);
  });

  describe("getHeart", () => {
    let req, res, storyId, userId;
    beforeEach(() => {
      storyId = faker.random.alphaNumeric(16);
      userId = faker.random.alphaNumeric(16);
      req = httpMocks.createRequest({
        params: { storyId },
        userId,
      });
      res = httpMocks.createResponse();
    });

    it("returns 200 with heart object including heartCnt, IsHeartUser", async () => {
      const heart = {
        id: faker.random.alphaNumeric(16),
        storyId: faker.random.alphaNumeric(16),
        userId: faker.random.alphaNumeric(16),
      };
      const count = faker.datatype.number();
      heartRepository.getByUserId = async (userId, storyId) => heart;
      heartRepository.getCount = async (userId, storyId) => count;

      await heartController.getHeart(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        heartCnt: count,
        IsHeartUser: true,
      });
    });
  });

  describe("getStoryOrderedByHeart", () => {
    it("returns 200 with story object ordered by heart count", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const story = [
        {
          title: faker.name.title(),
          address: faker.address.streetAddress(),
          id: faker.random.alphaNumeric(16),
          createdAt: faker.datatype.datetime(),
        },
      ];
      heartRepository.getStoryByHeart = async () => story;

      await heartController.getStoryOrderedByHeart(req, res);
      const parsed = JSON.parse(JSON.stringify(story));

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(parsed);
    });
  });

  describe("createHeart", () => {
    it("returns 201 with heart object including heartCnt", async () => {
      const storyId = faker.random.alphaNumeric(16);
      const count = faker.datatype.number();
      const req = httpMocks.createRequest({
        params: { storyId },
      });
      const res = httpMocks.createResponse();
      heartRepository.getCount = (storyId) => count;

      await heartController.createHeart(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ heartCnt: count });
    });
  });

  describe("deleteHeart", () => {
    it("returns 200 with new heartCnt object", async () => {
      const storyId = faker.random.alphaNumeric(16);
      const userId = faker.random.alphaNumeric(16);
      const req = httpMocks.createRequest({
        params: { storyId },
        userId,
      });
      const res = httpMocks.createResponse();
      const count = faker.datatype.number();
      heartRepository.deleteHeart = (storyId) => count;

      await heartController.deleteHeart(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ heartCnt: count });
    });
  });
});
