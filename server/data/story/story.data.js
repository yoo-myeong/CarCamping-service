import SQ from "sequelize";
import { sequelize } from "../../db/database.js";
import { User } from "../auth/auth.data.js";

const DataTypes = SQ.DataTypes;

export const Story = sequelize.define("story", {
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
    allowNull: true,
  },
  knowhow: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
User.hasMany(Story);
Story.belongsTo(User);

const Image = sequelize.define(
  "stroyImage",
  {
    imgname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Story.hasMany(Image, {
  onDelete: "CASCADE",
});
Image.belongsTo(Story);

export async function getAll() {
  return Story.findAll({
    include: {
      model: User,
      attributes: ["name"],
    },
  });
}

export async function getByname(name) {
  return Story.findAll({
    include: {
      model: User,
      where: { name },
      attributes: ["name"],
    },
  });
}

export async function getStoryById(storyId) {
  return Story.findByPk(storyId, {
    attributes: [
      "title",
      "createdAt",
      "address",
      "waytogo",
      "knowhow",
      "userId",
    ],
    include: {
      model: User,
      attributes: ["name"],
    },
  });
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
  const storyId = story.dataValues.id;
  for (let i = 0; i < imgnames.length; i++) {
    const imgname = imgnames[i];
    Image.create({ imgname, storyId });
  }
  return storyId;
}

export async function getImgbyStoryId(storyId) {
  return Image.findAll({ where: { storyId } });
}

export async function getOneImgByStoryId(storyId) {
  return Image.findOne({ where: { storyId } });
}

export async function updateStory(id, body) {
  const { title, address, waytogo, knowhow, imgnames, deleteImgnames } = body;
  const story = await Story.findByPk(id);
  story.set({
    title,
    address,
    waytogo,
    knowhow,
  });
  await story.save();

  const storyId = story.dataValues.id;
  if (deleteImgnames) {
    Image.findAll({ where: { storyId } }).then((images) => {
      images.forEach((img) => {
        if (deleteImgnames.includes(img.dataValues.imgname)) {
          img.destroy();
        }
      });
    });
  }

  for (let i = 0; i < imgnames.length; i++) {
    const imgname = imgnames[i];
    Image.create({ imgname, storyId });
  }
  return storyId;
}

export async function deleteStory(id) {
  Story.findByPk(id).then((story) => {
    story.destroy();
  });
}