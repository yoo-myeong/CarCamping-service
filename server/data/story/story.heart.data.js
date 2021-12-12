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

export async function getHeartCnt(storyId) {
  return StoryHeart.count({
    where: { storyId },
  });
}

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
  const storyheart = await StoryHeart.findOne({
    where: {
      storyId,
      userId,
    },
  });
  await storyheart.destroy();
  return getHeartCnt(storyId);
}
