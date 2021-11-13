import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.data.js";

const DataTypes = SQ.DataTypes;

const Story = sequelize.define("story", {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waytogo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  knowhow: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Story.belongsTo(User);

const Image = sequelize.define(
  "image",
  {
    imagename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Image.belongsTo(Story);

export async function createStory(body, userId) {
  const { address, waytogo, knowhow, imgnames } = body;
  const story = await Story.create({ address, waytogo, knowhow, userId });
  const images = [];
  const storyId = story.dataValues.id;
  for (let i = 0; i < imgnames.length; i++) {
    const imagename = imgnames[i];
    const image = await Image.create({ imagename, storyId });
    images.push(image.dataValues.id);
  }
  return {
    ...story.dataValues,
    images,
  };
}
