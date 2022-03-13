import { config } from "../../config/config.js";

export class TagController {
  constructor(tagRepository) {
    this.tags = tagRepository;
  }

  getAllTags = async (req, res) => {
    try {
      const tags = await this.tags.getAll();
      res.status(200).json(tags);
    } catch (e) {
      throw new Error(`태그 가져오기 실패\n${e}`);
    }
  };

  createTag = async (req, res) => {
    const body = req.body;
    try {
      if (req.email === config.admin.email) {
        this.tags.create(body);
        return res.sendStatus(201);
      }
      return res.sendStatus(403);
    } catch (e) {
      throw new Error(`태그 생성 실패\n${e}`);
    }
  };

  deleteTag = async (req, res) => {
    const tagname = req.params.name;
    try {
      if (req.email === config.admin.email) {
        this.tags.deleteByName(tagname);
        return res.sendStatus(204);
      }
      return res.sendStatus(403);
    } catch (e) {
      throw new Error(`태그 삭제 실패\n${e}`);
    }
  };
}
