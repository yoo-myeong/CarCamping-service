import SQ from "sequelize";
import { sequelize } from "../../db/database.js";
import { User } from "../auth/auth.data.js";

const Op = SQ.Op;
const DataTypes = SQ.DataTypes;
const ORDER_DESC = { order: [["createdAt", "DESC"]] };
const ORDER_ASC = { order: [["createdAt", "ASC"]] };

export const Story = sequelize.define("story", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campsite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campsite_startTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  campsite_endTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  campsite_price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  campsite_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
User.hasMany(Story);
Story.belongsTo(User);

export const Image = sequelize.define(
  "storyImage",
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

const Tag = sequelize.define(
  "storyTag",
  {
    tag: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
Story.hasMany(Tag, {
  onDelete: "CASCADE",
});
Tag.belongsTo(Story);

export async function create(data, userId) {
  const { imgnames, tags, ...body } = data;

  const story = await Story.create({
    ...body,
    userId,
  });

  const storyId = story.dataValues.id;

  if (imgnames) {
    imgnames.forEach((imgname) => {
      Image.create({ imgname, storyId });
    });
  }

  if (tags) {
    if (Array.isArray(tags)) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        Tag.create({ tag, storyId });
      }
    } else {
      Tag.create({ tag: tags, storyId });
    }
  }

  return storyId;
}

export async function getAll(sort) {
  const direction = !sort || sort === "desc" ? ORDER_DESC : ORDER_ASC;

  return Story.findAll({
    ...direction,
    attributes: ["title", "address", "id", "createdAt"],
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

export async function getByAddress(search) {
  return Story.findAll({
    ...ORDER_DESC,
    where: {
      address: {
        [Op.like]: "%" + search + "%",
      },
    },
    attributes: ["title", "address", "id", "createdAt"],
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

export async function getByusername(name) {
  return Story.findAll({
    ...ORDER_DESC,
    attributes: ["title", "address", "id", "createdAt"],
    include: [
      {
        model: User,
        where: { name },
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

export async function getStoryById(id) {
  return Story.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Tag,
        attributes: ["tag"],
      },
      {
        model: Image,
        attributes: ["imgname"],
      },
    ],
  });
}

export async function update(id, data) {
  const { imgnames, tags, deleteImgnames, ...body } = data;

  Story.update(body, {
    where: { id },
  });

  if (deleteImgnames) {
    deleteImgnames.forEach((imgname) => {
      Image.destroy({ where: { storyId: id, imgname } });
    });
  }

  await Tag.destroy({ where: { storyId: id } });
  if (tags) {
    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        Tag.create({ tag, storyId: id });
      });
    } else {
      Tag.create({ tag: tags, storyId: id });
    }
  }

  if (imgnames) {
    imgnames.forEach((imgname, i) => {
      Image.create({ imgname, storyId: id });
    });
  }

  return id;
}

export async function destroy(id) {
  Story.findByPk(id).then((story) => {
    story.destroy();
  });
}

export async function getUserIdById(id) {
  return Story.findByPk(id, {
    attributes: ["userId"],
  });
}
