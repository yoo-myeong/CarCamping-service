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
  const imgnames = body.imgnames;
  delete body[imgnames];
  const shop = await Shop.create({ ...body, userId });
  const shopId = shop.dataValues.id;
  imgnames.forEach((imgname) => {
    Image.create({ imgname, shopId });
  });
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
