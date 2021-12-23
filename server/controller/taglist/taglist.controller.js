import * as taglistData from "../../data/taglist/taglist.data.js";

export async function getAllTags(req, res, next) {
  const tags = await taglistData.getAllTags();
  res.status(200).json(tags);
}

export async function deleteTags(req, res) {
  const tagname = req.params.name;
  taglistData.deleteTagByName(tagname);
  res.sendStatus(204);
}

export async function creatTag(req, res) {
  const body = req.body;
  taglistData.createTag(body);
  res.sendStatus(201);
}
