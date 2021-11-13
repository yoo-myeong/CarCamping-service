import * as storyData from "../data/story.data.js";

export async function getStory(req, res, next) {
  const email = req.query.email;
  //   if (id) {
  //     const story = stories.find({ id });
  //     return res.status(200).json(story);
  //   }
  res.status(200).json(stories);
}

export async function getStoryById(req, res, next) {}

export async function updateStory(req, res, next) {}

export async function deleteStory(req, res, next) {}

export async function createStory(req, res, next) {
  const story = await storyData.createStory(req.body, req.userId);
  res.status(200).json(story);
}
