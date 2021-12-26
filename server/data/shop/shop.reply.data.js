import SQ from "sequelize";
import { sequelize } from "../../db/database.js";
import { Shop } from "./shop.data.js";
import { User } from "../auth/auth.data.js";

const DataTypes = SQ.DataTypes;

const ShopReply = sequelize.define("shopReply", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Shop.hasMany(ShopReply, {
  onDelete: "CASCADE",
});
User.hasMany(ShopReply, {
  onDelete: "CASCADE",
});
ShopReply.belongsTo(Shop);
ShopReply.belongsTo(User);

export async function getAllReply(shopId) {
  const replies = await ShopReply.findAll({
    where: { shopId },
    attributes: ["content", "createdAt", "userId"],
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  return replies;
}

export async function createShopReply(reply) {
  return ShopReply.create(reply);
}
