import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.data.js";

const DataTypes = SQ.DataTypes;

const Story = sequelize.define("story", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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

export async function getAll() {
  return Story.findAll({
    include: {
      model: User,
    },
  });
}

export async function getByEmail(email) {
  return Story.findAll({ where: email });
}

export async function createStory(body, userId) {
  const { title, address, waytogo, knowhow, imgnames } = body;
  const story = await Story.create({
    title,
    address,
    waytogo,
    knowhow,
    userId,
  });
  const images = [];
  const storyId = story.dataValues.id;
  for (let i = 0; i < imgnames.length; i++) {
    const imagename = imgnames[i];
    const image = await Image.create({ imagename, storyId });
    images.push(image.dataValues.imagename);
  }
  return storyId;
}

export async function getImgbyStoryId(storyId) {
  return Image.findAll({ where: { storyId } });
}
