import { config } from "../../config/config.js";
import * as storyData from "../../data/story/story.data.js";
import "express-async-errors";

export async function createStory(req, res, next) {
  try {
    const storyId = await storyData.createStory(req.body, req.userId);
    return res.status(201).json({ storyId });
  } catch (e) {
    throw new Error(`스토리 생성 실패\n${e}`);
  }
}

export async function getStory(req, res, next) {
  const { username, sort, search } = req.query;
  const decodedSearch = decodeURI(search);
  try {
    if (username) {
      const story = await storyData.getByusername(username);
      return res.status(200).json(story);
    }
    if (search) {
      const story = await storyData.getSearchingStory(decodedSearch);
      return res.status(200).json(story);
    }
    const story = await storyData.getStory(sort);
    res.status(200).json(story);
  } catch (e) {
    throw new Error(`스토리 가져오기 중 오류\n${e}`);
  }
}

export async function getStoryById(req, res, next) {
  const id = req.params.id;
  try {
    const story = await storyData.getStoryById(id);
    res.status(200).json(story);
  } catch (e) {
    throw new Error(`id의 스토리 가져오기 실패\n${e}`);
  }
}

export async function updateStory(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  try {
    const story = await storyData.getStoryUserId(id);
    if (!story) {
      return res.status(404).json({ message: `there's no story of which id is ${id}` });
    }
    if (req.userId !== story.userId) {
      return res.status(403).json({ message: "not allowed to update this story" });
    }
    const storyId = await storyData.updateStory(id, body);
    res.status(200).json({ storyId });
  } catch (e) {
    throw new Error(`스토리 수정 중 오류\n${e}`);
  }
}

export async function deleteStory(req, res, next) {
  const id = req.params.id;
  try {
    const story = await storyData.getStoryUserId(id);
    if (!story) {
      return res.status(404).json({ message: `there's no story that id is ${id}` });
    }
    if (req.userId !== story.userId && req.email !== config.admin.email) {
      return res.status(403).json({ message: "you're not allowed to delete this story" });
    }
    await storyData.deleteStory(id);
    res.sendStatus(204);
  } catch (e) {
    throw new Error(`스토리 삭제 중 오류\n${e}`);
  }
}

export async function checkAuthor(req, res, next) {
  try {
    const story = await storyData.getStoryUserId(req.params.id);
    if (story.userId === req.userId) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    throw new Error(`사용자와 스토리 게시자 비교 중 오류\n${e}`);
  }
}
