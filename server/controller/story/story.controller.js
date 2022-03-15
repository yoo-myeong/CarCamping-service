import { config } from "../../config/config.js";
import "express-async-errors";

export class StoryController {
  constructor(storyRepository) {
    this.stories = storyRepository;
  }

  createStory = async (req, res) => {
    try {
      const storyId = await this.stories.create(req.body, req.userId);
      return res.status(201).json({ storyId });
    } catch (e) {
      throw new Error(`스토리 생성 실패\n${e}`);
    }
  };

  getStory = async (req, res) => {
    const { username, sort, search } = req.query;
    const decodedSearch = decodeURI(search);
    try {
      if (username) {
        const story = await this.stories.getByusername(username);
        return res.status(200).json(story);
      }
      if (search) {
        const story = await this.stories.getByAddress(decodedSearch);
        return res.status(200).json(story);
      }
      const story = await this.stories.getAll(sort);
      res.status(200).json(story);
    } catch (e) {
      throw new Error(`스토리 가져오기 중 오류\n${e}`);
    }
  };

  getStoryById = async (req, res) => {
    const id = req.params.id;
    try {
      const story = await this.stories.getStoryById(id);
      res.status(200).json(story);
    } catch (e) {
      throw new Error(`id의 스토리 가져오기 실패\n${e}`);
    }
  };

  updateStory = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const story = await this.stories.getUserIdById(id);
      if (!story) {
        return res.status(404).json({ msg: `there's no story of which id is ${id}` });
      }
      if (req.userId !== story.userId) {
        return res.status(403).json({ msg: "not allowed to update this story" });
      }
      const storyId = await this.stories.update(id, body);
      res.status(200).json({ storyId });
    } catch (e) {
      throw new Error(`스토리 수정 중 오류\n${e}`);
    }
  };

  deleteStory = async (req, res) => {
    const id = req.params.id;
    try {
      const story = await this.stories.getUserIdById(id);
      if (!story) {
        return res.status(404).json({ msg: `there's no story that id is ${id}` });
      }
      if (req.userId !== story.userId) {
        return res.status(403).json({ msg: "you're not allowed to delete this story" });
      }
      await this.stories.destroy(id);
      res.sendStatus(204);
    } catch (e) {
      throw new Error(`스토리 삭제 중 오류\n${e}`);
    }
  };

  authorize = async (req, res) => {
    try {
      const story = await this.stories.getUserIdById(req.params.id);
      if (story.userId === req.userId) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(401);
      }
    } catch (e) {
      throw new Error(`사용자와 스토리 게시자 비교 중 오류\n${e}`);
    }
  };
}
