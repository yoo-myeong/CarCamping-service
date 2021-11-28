import * as storyHeartData from "../../data/story/story_heart.data.js";

export async function getHeart(req, res, next) {
  const storyId = req.params.storyId;
  const storyheart = await storyHeartData.getHeart(req.userId, storyId);
  if (storyheart) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(404);
  }
}

export async function createHeart(req, res, next) {
  const storyId = req.body.storyId;
  const stroyheart = await storyHeartData.createHeart(req.userId, storyId);
  if (stroyheart) {
    return res.sendStatus(201);
  }
  res.sendStatus(400);
}

export async function deleteHeart(req, res, next) {
  const storyId = req.params.storyId;
  storyHeartData.deleteHeart(req.userId, storyId).then(() => {
    res.sendStatus(204);
  });
}
