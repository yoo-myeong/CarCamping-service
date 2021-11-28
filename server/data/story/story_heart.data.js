import SQ from "sequelize";
import { sequelize } from "../../db/database.js";
import { User } from "../auth/auth.data.js";
import { Story } from "./story.data.js";

const DataTypes = SQ.DataTypes;

const StoryHeart = sequelize.define("storyheart", {});
User.hasMany(StoryHeart, {
  onDelete: "CASCADE",
});
Story.hasMany(StoryHeart, {
  onDelete: "CASCADE",
});
StoryHeart.belongsTo(User);
StoryHeart.belongsTo(Story);

export async function getHeart(userId, storyId) {
  const storyHeart = await StoryHeart.findOne({
    where: {
      userId,
      storyId,
    },
  });
  return storyHeart;
}

export async function createHeart(userId, storyId) {
  const storyheart = await StoryHeart.create({
    userId,
    storyId,
  });
  return storyheart;
}

export async function deleteHeart(userId, storyId) {
  StoryHeart.findOne({
    where: {
      storyId,
      userId,
    },
  }).then((storyheart) => {
    storyheart.destroy();
  });
}
