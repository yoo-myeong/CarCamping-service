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

const Image = sequelize.define(
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

const Tag = sequelize.define("storyTag", {
  tag: {
    type: DataTypes.STRING,
  },
});
Story.hasMany(Tag, {
  onDelete: "CASCADE",
});
Tag.belongsTo(Story);

export async function createStory(body, userId) {
  const imgnames = body.imgnames;
  const tags = body.tags;
  delete body.imgnames;
  delete body.tags;
  const story = await Story.create({
    ...body,
    userId,
  });

  const storyId = story.dataValues.id;

  if (imgnames) {
    for (let i = 0; i < imgnames.length; i++) {
      const imgname = imgnames[i];
      Image.create({ imgname, storyId });
    }
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

export async function getSimpleStory() {
  return Story.findAll({
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

export async function getByname(name) {
  return Story.findAll({
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

export async function getOneImgByStoryId(storyId) {
  return Image.findOne({ where: { storyId } });
}

export async function updateStory(id, body) {
  // 개별 처리 할 데이터 pop
  const imgnames = body.imgnames;
  const tags = body.tags;
  const deleteImgnames = body.deleteImgnames;
  console.log(deleteImgnames);
  delete body.imgnames;
  delete body.tags;
  delete body.deleteImgnames;

  // story 테이블 update
  const story = await Story.findByPk(id);
  story.set(body);
  await story.save();

  // story의 img를 가져와서 삭제리스트에 포함된 것이면 삭제
  if (deleteImgnames) {
    Image.findAll({ where: { storyId: id } }).then((images) => {
      images.forEach((img) => {
        if (deleteImgnames.includes(img.dataValues.imgname)) {
          img.destroy();
        }
      });
    });
  }

  // tag 업데이트
  if (tags) {
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      Tag.create({ tag, storyId: id });
    }
  }

  // 새 이미지 업로드
  if (imgnames) {
    for (let i = 0; i < imgnames.length; i++) {
      const imgname = imgnames[i];
      Image.create({ imgname, storyId: id });
    }
  }
  return id;
}

export async function deleteStory(id) {
  Story.findByPk(id).then((story) => {
    story.destroy();
  });
}
