import fs from "fs";
import * as nodeFetch from "../../fetch/nodeFetch.js";
import { formService } from "../service/form.js";
import "express-async-errors";

export async function renderBoardPage(req, res, next) {
  res.render("shop/shop.board.ejs");
}

export async function renderPostPage(req, res, next) {
  const token = req.cookies["token"];
  const http = new nodeFetch.HttpClient();
  try {
    await http.authenticate(token);
    res.render("shop/shop.post.ejs");
  } catch (e) {
    res.status(403).render("auth/login.ejs");
  }
}

export async function rederDeatilPage(req, res, next) {
  const shopId = req.params.id;
  const token = req.cookies["token"];
  const http = new nodeFetch.HttpClient();
  try {
    await http.authenticate(token);
    res.render("shop/shop.detail.ejs", { shopId });
  } catch (e) {
    res.status(403).render("auth/login.ejs");
  }
}

export async function postShop(req, res, next) {
  const imgnames = req.files.map((img) => img.filename);
  const token = req.cookies["token"];
  const data = { ...req.body, imgnames };
  const http = new nodeFetch.HttpClient();
  const service = new formService(http, token, "shop");
  let shopId;
  try {
    const response = await service.requestWithBody("POST", "/shop", data);
    shopId = response.shopId;
  } catch (e) {
    throw new Error(`거래 게시물 생성 실패\n${e}`);
  }

  try {
    await service.createDirectory(shopId);
  } catch (e) {
    throw new Error(`거래 게시물 이미지 폴더 생성 실패\n${e}`);
  }

  imgnames.forEach((imgname) => {
    service.moveTempFileToOwnFolder(imgname, shopId);
  });
  return res.redirect("/shop/detail/" + shopId);
}

export async function deleteShop(req, res, next) {
  fs.rmSync(`./uploads/shop/shop_${req.params.id}`, {
    recursive: true,
    force: true,
  });
}
