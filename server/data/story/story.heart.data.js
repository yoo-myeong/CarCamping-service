import { sequelize } from "../../db/database.js";
import { User } from "../auth/auth.data.js";
import { Story, Image } from "./story.data.js";

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

export async function getStoryOrderedByHeart() {
  return Story.findAll({
    attributes: ["title", "address", "id", "createdAt"],
    include: [
      {
        model: StoryHeart,
        attributes: [],
      },
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Image,
        attributes: ["imgname"],
        limit: 1,
      },
    ],
    group: "id",
    order: [
      [sequelize.fn("COUNT", sequelize.col("storyhearts.id")), "DESC"],
      ["createdAt", "DESC"],
    ],
  });
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
