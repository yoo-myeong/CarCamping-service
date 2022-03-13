import faker from "faker";
import httpMocks from "node-mocks-http";
import { TagController } from "./tag.controller.js";

describe("TagController", () => {
  let tagController;
  let tagRepository;
  beforeEach(() => {
    tagRepository = {};
    tagController = new TagController(tagRepository);
  });

  describe("getAllTags", () => {
    it("returns 200 with tag object", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const tags = [{ tagname: faker.random.word() }, { tagname: faker.random.words() }];
      tagRepository.getAll = async () => tags;

      await tagController.getAllTags(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(tags);
    });
  });

  describe("creatTag", () => {
    let req, res, tagname;
    beforeEach(() => {
      tagname = faker.random.word();
      req = httpMocks.createRequest({
        body: { tagname },
      });
      res = httpMocks.createResponse();
    });

    it("returns 403 for forbidden user", async () => {
      req.email = undefined;

      await tagController.createTag(req, res);

      expect(res.statusCode).toBe(403);
    });

    it("returns 201 when tag is created", async () => {
      req.email = process.env.ADMIN_EMAIL;
      tagRepository.create = () => {};

      await tagController.createTag(req, res);

      expect(res.statusCode).toBe(201);
    });
  });

  describe("deleteTag", () => {
    let req, res, name;
    beforeEach(() => {
      name = faker.random.word();
      req = httpMocks.createRequest({
        params: { name },
      });
      res = httpMocks.createResponse();
    });

    it("returns 403 for forbidden user", async () => {
      req.email = undefined;

      await tagController.deleteTag(req, res);

      expect(res.statusCode).toBe(403);
    });

    it("returns 204 when a tag is deleted", async () => {
      req.email = process.env.ADMIN_EMAIL;
      tagRepository.deleteByName = (tagname) => {};

      await tagController.deleteTag(req, res);

      expect(res.statusCode).toBe(204);
    });
  });
});
