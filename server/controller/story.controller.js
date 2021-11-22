import * as storyData from "../data/story.data.js";

async function combineStoriesWithThumbnailAndUsername(story) {
  const data = [];
  for (let i = 0; i < story.length; i++) {
    const { id, title, address, createdAt, user } = story[i].dataValues;
    const imgname = await storyData.getOneImgByStoryId(id);
    console.log(imgname);
    data.push({
      thumbnail: imgname ? imgname.dataValues.imgname : null,
      title,
      address,
      storyId: id,
      createdAt,
      name: user.name,
    });
  }
  return data;
}

export async function getStory(req, res, next) {
  const name = req.query.name;
  //query가 들어온 경우면 받아올 데이터 filter
  if (name) {
    const story = await storyData.getByname(name);
    const data = await combineStoriesWithThumbnailAndUsername(story);
    return res.status(200).json(data);
  }
  const story = await storyData.getAll();
  const data = await combineStoriesWithThumbnailAndUsername(story);
  res.status(200).json(data);
}

export async function getStoryById(req, res, next) {
  const storyId = req.params.id;
  const story = await storyData.getStoryById(storyId);
  const imgnames = await storyData.getImgbyStoryId(storyId);
  const imgArray = [];
  imgnames.forEach((imgname) => imgArray.push(imgname.imgname));
  res.status(200).json({
    story,
    imgnames: imgArray,
  });
}

export async function updateStory(req, res, next) {
  const id = req.params.id;
  const story = await storyData.getStoryById(id);
  if (!story) {
    return res
      .status(404)
      .json({ message: `there's no story that id is ${id}` });
  }
  if (req.userId !== story.userId) {
    return res
      .status(403)
      .json({ message: "you're not allowed to update this story" });
  }
  const body = req.body;
  const stroyId = await storyData.updateStory(id, body);
  res.status(200).json({ stroyId });
}

export async function deleteStory(req, res, next) {
  const id = req.params.id;
  const story = await storyData.getStoryById(id);
  if (!story) {
    return res
      .status(404)
      .json({ message: `there's no story that id is ${id}` });
  }
  if (req.userId !== story.userId) {
    return res
      .status(403)
      .json({ message: "you're not allowed to delete this story" });
  }
  await storyData.deleteStory(id);
  res.sendStatus(204);
}

export async function createStory(req, res, next) {
  const storyId = await storyData.createStory(req.body, req.userId);
  res.status(201).json({ storyId });
}
