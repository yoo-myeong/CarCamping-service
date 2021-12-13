import SQ from "sequelize";
import { sequelize } from "../../db/database.js";

const DataTypes = SQ.DataTypes;

export const Taglist = sequelize.define(
  "taglist",
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
  return await Taglist.findAll({
    attributes: ["tagname"],
  });
}
