import * as taglistData from "../../data/taglist/taglist.data.js";
import { config } from "../../config.js";

export async function getAllTags(req, res, next) {
  const tags = await taglistData.getAllTags();
  res.status(200).json(tags);
}

export async function deleteTags(req, res) {
  const tagname = req.params.name;
  if (req.email === config.admin.email) {
    taglistData.deleteTagByName(tagname);
    res.sendStatus(204);
  }
}

export async function creatTag(req, res) {
  const body = req.body;
  if (req.email === config.admin.email) {
    taglistData.createTag(body);
    res.sendStatus(201);
  }
}
