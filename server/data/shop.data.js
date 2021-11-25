import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.data.js";

const DataTypes = SQ.DataTypes;

const Shop = sequelize.define("shop", {
  stuff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});
Shop.belongsTo(User);

const Image = sequelize.define(
  "shopImage",
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
Shop.hasMany(Image, {
  onDelete: "CASCADE",
});
Image.belongsTo(Shop);

export async function getAll() {
  return Shop.findAll({
    include: {
      model: User,
      attributes: ["name"],
    },
  });
}

export async function createShop(body, userId) {
  const { stuff, price, mobile, transaction, description, imgnames } = body;
  const shop = await Shop.create({
    stuff,
    price,
    mobile,
    transaction,
    description,
    userId,
  });
  const shopId = shop.dataValues.id;
  for (let i = 0; i < imgnames.length; i++) {
    const imgname = imgnames[i];
    Image.create({ imgname, shopId });
  }
  return shopId;
}

export async function getShopById(id) {
  return Shop.findByPk(id);
}

export async function deleteShop(id) {
  Shop.findByPk(id).then((shop) => {
    shop.destroy();
  });
}

export async function getShopByIdWithImg(id) {
  return Shop.findByPk(id, {
    attributes: ["stuff", "mobile", "createdAt", "price", "description"],
    include: [
      {
        model: Image,
        attributes: ["imgname"],
      },
      { model: User, attributes: ["name"] },
    ],
  });
}
