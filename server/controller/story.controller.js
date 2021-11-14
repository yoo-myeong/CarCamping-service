import * as storyData from "../data/story.data.js";

export async function getStory(req, res, next) {
  const email = req.query.email;
  //query가 들어온 경우면 받아올 데이터 filter
  if (email) {
    const story = await storyData.getByEmail(email);
    return res.status(200).json(story);
  }
  const data = [];
  const story = await storyData.getAll();
  for (let i = 0; i < story.length; i++) {
    const { id, title, address, createdAt, user } = story[i].dataValues;
    const imagename = await storyData.getImgbyStoryId(id);
    data.push({
      imagename: imagename[0].dataValues.imagename,
      title,
      address,
      storyId: id,
      createdAt,
      name: user.name,
    });
  }
  res.status(200).json(data);
}

export async function getStoryById(req, res, next) {}

export async function updateStory(req, res, next) {}

export async function deleteStory(req, res, next) {}

export async function createStory(req, res, next) {
  const storyId = await storyData.createStory(req.body, req.userId);
  res.status(200).json(storyId);
}
