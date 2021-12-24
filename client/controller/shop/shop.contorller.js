import fs from "fs";
import { config } from "../../config.js";
import * as nodeFetch from "../../fetch/nodeFetch.js";

export async function renderBoardPage(req, res, next) {
  res.render("shop/shop.board.ejs");
}

export async function renderPostPage(req, res, next) {
  res.render("shop/shop.post.ejs");
}

export async function rederDeatilPage(req, res, next) {
  const shopId = req.params.id;
  res.render("shop/shop.detail.ejs", { shopId });
}

export async function postShop(req, res, next) {
  const filenames = req.files.map((img) => img.filename);
  const url = config.backendURL + "/shop";
  const token = req.cookies["token"];

  const json = {
    ...req.body,
    imgnames: filenames,
  };

  const response = await nodeFetch.fetchPostApiWithToken(url, json, token);
  const response_JsonFormat = await response.json();
  if (response.status === 201) {
    const shopId = response_JsonFormat.shopId;
    const isexist = fs.existsSync(`./uploads/shop/shop_${shopId}`);
    if (isexist) {
      return res
        .status(500)
        .json({ msg: "Image directory with this id already exists" });
    } else {
      // shopId를 폴더로 생성해서 temp에 저장한 이미지 옮긴 후 shopId 반환
      fs.mkdirSync(`./uploads/shop/shop_${shopId}`, (err) =>
        res.status(500).json(err)
      );
      filenames.forEach((imgname) => {
        fs.renameSync(
          `./uploads/shop/shopImg_temp/${imgname}`,
          `./uploads/shop/shop_${shopId}/${imgname}`
        );
      });
      return res.redirect("/shop/detail/" + shopId);
    }
  } else {
    console.error(response_JsonFormat);
    return res.status(500).json({ msg: "can't create shop or store images" });
  }
}

export async function deleteShop(req, res, next) {
  fs.rmSync(`./uploads/shop/shop_${req.params.id}`, {
    recursive: true,
    force: true,
  });
}
