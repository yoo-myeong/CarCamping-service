import * as storyHeartData from "../../data/story/story.heart.data.js";
import "express-async-errors";
import * as storyData from "../../data/story/story.data.js";

export async function getHeart(req, res, next) {
  const storyId = req.params.storyId;
  let IsHeartUser = false;
  try {
    const storyheart = await storyHeartData.getHeartByUserId(req.userId, storyId);
    if (storyheart) IsHeartUser = true;
  } catch (e) {
    throw new Error(`id의 스토리 하트 가져오기 실패\n${e}`);
  }
  try {
    const heartCnt = await storyHeartData.getHeartCnt(storyId);
    return res.status(200).json({ heartCnt, IsHeartUser });
  } catch (e) {
    throw new Error(`스토리 하트 개수 가져오기 실패\n${e}`);
  }
}

export async function getStoryOrderedByHeart(req, res, next) {
  try {
    const story = await storyHeartData.getStoryOrderedByHeart();
    return res.status(200).json(story);
  } catch (e) {
    throw new Error(`하트 많은 순으로 스토리 가져오기 실패\n${e}`);
  }
}

export async function createHeart(req, res, next) {
  const storyId = req.body.storyId;
  try {
    const stroyheart = await storyHeartData.createHeart(req.userId, storyId);
    const heartCnt = await storyHeartData.getHeartCnt(storyId);
    if (stroyheart) {
      return res.status(201).json({ heartCnt });
    }
    return res.status(400).json({ heartCnt });
  } catch (e) {
    const story = await storyData.getStoryById();
    if (!story) return res.sendStatus(404);
    throw new Error(`스토리 하트 생성 중 실패\n${e}`);
  }
}

export async function deleteHeart(req, res, next) {
  const storyId = req.params.storyId;
  try {
    const heartCnt = await storyHeartData.deleteHeart(req.userId, storyId);
    return res.status(200).json({ heartCnt });
  } catch (e) {
    const story = await storyData.getStoryById();
    if (!story) return res.sendStatus(404);
    throw new Error(`하트 삭제 실패\n${e}`);
  }
}
