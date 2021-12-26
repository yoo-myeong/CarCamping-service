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
  const imgnames = req.files.map((img) => img.filename);
  const postShopURL = config.backendURL + "/shop";
  const token = req.cookies["token"];
  const postData = { ...req.body, imgnames };
  const responseFromPostShopAPI = await nodeFetch.fetchPostApiWithToken(
    postShopURL,
    postData,
    token
  );
  const responseParsed = await responseFromPostShopAPI.json();
  if (responseFromPostShopAPI.status === 201) {
    const shopId = responseParsed.shopId;
    const isexist = fs.existsSync(`./uploads/shop/shop_${shopId}`);
    if (isexist) {
      return res
        .status(500)
        .json({ msg: "Image directory of this id already exists" });
    } else {
      fs.mkdirSync(`./uploads/shop/shop_${shopId}`, (err) =>
        res.status(500).json(err)
      );
      imgnames.forEach((imgname) => {
        fs.renameSync(
          `./uploads/shop/shopImg_temp/${imgname}`,
          `./uploads/shop/shop_${shopId}/${imgname}`
        );
      });
      return res.redirect("/shop/detail/" + shopId);
    }
  } else {
    console.error(responseParsed);
    return res.status(500).json({ msg: "can't create shop or store images" });
  }
}

export async function deleteShop(req, res, next) {
  fs.rmSync(`./uploads/shop/shop_${req.params.id}`, {
    recursive: true,
    force: true,
  });
}
