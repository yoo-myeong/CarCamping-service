import * as taglistData from "../../data/taglist/taglist.data.js";

export async function getAllTags(req, res, next) {
  const tags = await taglistData.getAllTags();
  res.status(200).json(tags);
}
