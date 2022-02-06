import fs from "fs";
import fetch from "node-fetch";
import { config } from "../../config.js";
import * as nodeFetch from "../../fetch/nodeFetch.js";
import "express-async-errors";
import { formService } from "../service/form.js";

const http = new nodeFetch.HttpClient();

export async function rederBoarePage(req, res, next) {
  res.status(200).render("story/story.board.ejs");
}

export async function searchAddress(req, res, next) {
  const search = req.params.address;
  res.status(200).render("story/story.board.search.ejs", { search });
}

export async function renderPostPage(req, res, next) {
  const token = req.cookies["token"];
  const http = new nodeFetch.HttpClient();
  try {
    await http.authenticate(token);
    res.status(200).render("story/story.post.ejs");
  } catch (e) {
    res.status(403).render("auth/login.ejs");
  }
}

export async function renderDetailPage(req, res, next) {
  const storyId = req.params.id;
  const token = req.cookies["token"];
  const http = new nodeFetch.HttpClient();
  try {
    await http.authenticate(token);
    res.status(200).render("story/story.detail.ejs", { storyId });
  } catch (e) {
    res.status(403).render("auth/login.ejs");
  }
}

export async function renderUpdatePage(req, res, next) {
  const storyId = req.params.id;
  const token = req.cookies["token"];
  const http = new nodeFetch.HttpClient();
  try {
    await http.fetch("/story/author/" + storyId, {
      method: "GET",
      headers: {
        cookie: `token=${token}`,
      },
    });
    res.status(200).render("story/story.update.ejs", { storyId });
  } catch (e) {
    res.sendStatus(403);
  }
}

function deleteEmptyProp(obj) {
  Object.keys(obj).forEach((x) => obj[x] === "" && delete obj[x]);
  return obj;
}

export async function postStory(req, res, next) {
  const imgnames = req.files.map((img) => img.filename);
  const token = req.cookies["token"];
  const service = new formService(http, token, "story");
  const body = deleteEmptyProp(req.body);
  const data = { ...body, imgnames };
  let storyId;
  try {
    const response = await service.requestWithBody("POST", "/story", data);
    storyId = response.storyId;
  } catch (e) {
    throw new Error(`스토리 생성 실패\n${e}`);
  }

  try {
    await service.createDirectory(storyId);
  } catch (e) {
    throw new Error(`스토리 이미지 폴더 생성 실패\n${e}`);
  }

  imgnames.forEach((imgname) => {
    service.moveTempFileToOwnFolder(imgname, storyId);
  });

  return res.redirect("/story/detail/" + storyId);
}

export async function updateStory(req, res) {
  const id = req.params.id;
  const token = req.cookies["token"];
  const service = new formService(http, token, "story");
  let { deleteImgnames, ...body } = req.body;
  deleteEmptyProp(body);
  const imgnames = req.files.map((img) => img.filename);
  imgnames.forEach((imgname) => {
    service.moveTempFileToOwnFolder(imgname, id);
  });

  deleteImgnames = [];
  Array.isArray(req.body.deleteImgnames)
    ? (deleteImgnames = req.body.deleteImgnames)
    : deleteImgnames.push(req.body.deleteImgnames);

  deleteImgnames.forEach((imgname) => {
    service.deleteFile(id, imgname);
  });

  const data = { ...body, imgnames, deleteImgnames };
  let storyId;
  try {
    const response = await service.requestWithBody("PUT", `/story/${id}`, data);
    storyId = response.storyId;
    return res.redirect("/story/detail/" + storyId);
  } catch (e) {
    throw new Error(`스토리 수정 실패\n${e}`);
  }
}

export async function deleteStory(req, res, next) {
  const id = req.params.id;
  fs.rmSync(`./uploads/story/story_${id}`, {
    recursive: true,
    force: true,
  });
}
