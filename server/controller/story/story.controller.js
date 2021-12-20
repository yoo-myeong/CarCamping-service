import * as storyData from "../../data/story/story.data.js";

export async function createStory(req, res, next) {
  const storyId = await storyData.createStory(req.body, req.userId);
  res.status(201).json({ storyId });
}

export async function getStory(req, res, next) {
  const username = req.query.username;
  const sort = req.query.sort;
  const search = req.query.search;
  const decodedSearch = decodeURI(search);
  //query가 들어온 경우면 받아올 데이터 filter
  if (username) {
    const story = await storyData.getByusername(username);
    return res.status(200).json(story);
  } else if (search !== undefined) {
    const story = await storyData.searchSimpleStory(search);
    return res.status(200).json(story);
  }
  const story = await storyData.getSimpleStory(sort);
  res.status(200).json(story);
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
    return res
      .status(404)
      .json({ message: `there's no story of which id is ${id}` });
  }
  if (req.userId !== story.userId) {
    return res
      .status(403)
      .json({ message: "you're not allowed to update this story" });
  }
  const body = req.body;
  console.log(body);
  const storyId = await storyData.updateStory(id, body);
  res.status(200).json({ storyId });
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

export async function checkAuthor(req, res, next) {
  const story = await storyData.getStoryById(req.params.id);
  if (story.userId === req.userId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}
