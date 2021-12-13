import SQ from "sequelize";
import { sequelize } from "../../db/database.js";
import { User } from "../auth/auth.data.js";

const DataTypes = SQ.DataTypes;

export const Shop = sequelize.define("shop", {
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
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  transtype: {
    type: DataTypes.STRING,
    allowNull: false,
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
    attributes: {
      exclude: ["userId, updatedAt"],
    },
    include: [
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
  });
}

export async function createShop(body, userId) {
  console.log(body); ////////////////////////////////////////////////////////////////////
  const {
    stuff,
    price,
    mobile,
    transaction,
    description,
    transtype,
    imgnames,
  } = body;
  const shop = await Shop.create({
    stuff,
    price,
    mobile,
    transaction,
    description,
    transtype,
    userId,
  });
  const shopId = shop.dataValues.id;
  for (let i = 0; i < imgnames.length; i++) {
    const imgname = imgnames[i];
    Image.create({ imgname, shopId });
  }
  return shopId;
}

export async function deleteShop(id) {
  Shop.findByPk(id).then((shop) => {
    shop.destroy();
  });
}

export async function getShopById(id) {
  return Shop.findByPk(id, {
    attributes: {
      exclude: ["updatedAt"],
    },
    include: [
      {
        model: Image,
        attributes: ["imgname"],
      },
      { model: User, attributes: ["name"] },
    ],
  });
}

export async function getOneImgByShopId(shopId) {
  return Image.findOne({
    where: { shopId },
  });
}
