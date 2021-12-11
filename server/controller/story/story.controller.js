import * as storyData from "../../data/story/story.data.js";

export async function createStory(req, res, next) {
  // 프론트엔드서버 거쳐오면서 null이 ""로 바뀌어서 전달되므로 삭제
  Object.keys(req.body).forEach((x) => req.body[x] == "" && delete req.body[x]);

  const storyId = await storyData.createStory(req.body, req.userId);
  res.status(201).json({ storyId });
}

export async function getStory(req, res, next) {
  const name = req.query.name;
  //query가 들어온 경우면 받아올 데이터 filter
  if (name) {
    const story = await storyData.getByname(name);
    return res.status(200).json(story);
  }
  const story = await storyData.getSimpleStory();
  res.status(200).json(story);
}

export async function getStoryById(req, res, next) {
  const id = req.params.id;
  const story = await storyData.getStoryById(id);
  res.status(200).json(story);
}

export async function updateStory(req, res, next) {
  // 프론트엔드서버 거쳐오면서 null이 ""로 바뀌어서 전달되므로 삭제
  Object.keys(req.body).forEach((x) => req.body[x] == "" && delete req.body[x]);

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
