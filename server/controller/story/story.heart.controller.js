import * as storyHeartData from "../../data/story/story.heart.data.js";

export async function getHeart(req, res, next) {
  const storyId = req.params.storyId;
  const storyheart = await storyHeartData.getHeart(req.userId, storyId);
  const heartCnt = await storyHeartData.getHeartCnt(storyId);
  if (storyheart) {
    return res.status(200).json({ heartCnt });
  } else {
    return res.status(404).json({ heartCnt });
  }
}

export async function createHeart(req, res, next) {
  const storyId = req.body.storyId;
  const stroyheart = await storyHeartData.createHeart(req.userId, storyId);
  const heartCnt = await storyHeartData.getHeartCnt(storyId);
  if (stroyheart) {
    return res.status(201).json({ heartCnt });
  }
  res.status(400).json({ heartCnt });
}

export async function deleteHeart(req, res, next) {
  const storyId = req.params.storyId;
  const heartCnt = await storyHeartData.deleteHeart(req.userId, storyId);
  return res.status(200).json({ heartCnt });
}
