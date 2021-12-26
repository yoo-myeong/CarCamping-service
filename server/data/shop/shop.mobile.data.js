import { sequelize } from "../../db/database.js";
import { User } from "../auth/auth.data.js";
import { Shop } from "./shop.data.js";

const shopMobileAccess = sequelize.define(
  "shop_mobile_access",
  {},
  { timestamps: false }
);
User.hasMany(shopMobileAccess, {
  onDelete: "CASCADE",
});
Shop.hasMany(shopMobileAccess, {
  onDelete: "CASCADE",
});

export async function getMobileAccessById(shopId) {
  return await shopMobileAccess.findAll({ where: { shopId } });
}

export async function createMobileAccess(shopId, userId) {
  shopMobileAccess.create({ shopId, userId });
}
