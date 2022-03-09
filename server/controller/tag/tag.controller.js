import * as tagData from "../../data/tag/tag.data.js";
import { config } from "../../config/config.js";

export async function getAllTags(req, res, next) {
  const tags = await tagData.getAllTags();
  res.status(200).json(tags);
}

export async function deleteTags(req, res) {
  const tagname = req.params.name;
  if (req.email === config.admin.email) {
    tagData.deleteTagByName(tagname);
    res.sendStatus(204);
  }
}

export async function creatTag(req, res) {
  const body = req.body;
  if (req.email === config.admin.email) {
    tagData.createTag(body);
    res.sendStatus(201);
  }
}
