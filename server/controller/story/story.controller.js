import { config } from "../../config/config.js";
import { logger } from "../../config/winston.js";
import * as storyData from "../../data/story/story.data.js";

export async function createStory(req, res, next) {
  try {
    const storyId = await storyData.createStory(req.body, req.userId);
    return res.status(201).json({ storyId });
  } catch (error) {
    logger.warn("스토리 생성 실패");
    next(error.message);
  }
}

export async function getStory(req, res, next) {
  const { username, sort, search } = req.query;
  const decodedSearch = decodeURI(search);
  if (username) {
    try {
      const story = await storyData.getByusername(username);
      return res.status(200).json(story);
    } catch (error) {
      logger.warn("username의 스토리 가져오기 실패");
      next(error.message);
    }
  }
  if (search) {
    try {
      const story = await storyData.getSearchingStory(decodedSearch);
      return res.status(200).json(story);
    } catch (error) {
      logger.warn("검색된 스토리 가져오기 실패");
      next(error.message);
    }
  }
  try {
    const story = await storyData.getStory(sort);
    res.status(200).json(story);
  } catch (error) {
    console.log(`${error}`);
    throw new Error(`스토리 가져오기 시도 에러\n${error}`);
  }
}

export async function getStoryById(req, res, next) {
  const id = req.params.id;
  const story = await storyData.getStoryById(id);
  res.status(200).json(story);
}

export async function updateStory(req, res, next) {
  const id = req.params.id;
  const story = await storyData.getStoryById(id);
  if (!story) {
    return res.status(404).json({ message: `there's no story of which id is ${id}` });
  }
  if (req.userId !== story.userId) {
    return res.status(403).json({ message: "not allowed to update this story" });
  }
  const body = req.body;
  const storyId = await storyData.updateStory(id, body);
  res.status(200).json({ storyId });
}

export async function deleteStory(req, res, next) {
  const id = req.params.id;
  const story = await storyData.getStoryById(id);
  if (!story) {
    return res.status(404).json({ message: `there's no story that id is ${id}` });
  }
  if (req.userId !== story.userId && req.email !== config.admin.email) {
    return res.status(403).json({ message: "you're not allowed to delete this story" });
  }
  await storyData.deleteStory(id);
  res.sendStatus(204);
}

export async function checkAuthor(req, res, next) {
  const story = await storyData.getStoryById(req.params.id);
  if (story.userId === req.userId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}
