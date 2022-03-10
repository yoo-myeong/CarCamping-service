import SQ from "sequelize";
import { sequelize } from "../../db/database.js";

const DataTypes = SQ.DataTypes;

export const Tag = sequelize.define(
  "tag",
  {
    tagname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export async function getAllTags() {
  return await Tag.findAll({
    attributes: ["tagname"],
  });
}

export async function deleteTagByName(tagname) {
  return Tag.destroy({ where: { tagname } });
}

export async function createTag(body) {
  return Tag.create(body);
}
