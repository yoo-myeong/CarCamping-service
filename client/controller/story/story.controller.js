import * as nodeFetch from "../../fetch/nodeFetch.js";
import fs from "fs";
import { config } from "../../config.js";
import fetch from "node-fetch";

export async function rederBoarePage(req, res, next) {
  res.status(200).render("story/story.board.ejs");
}

export async function renderPostPage(req, res, next) {
  const token = req.cookies["token"];
  const response = await nodeFetch.fetchGetApiWithToken(config.backendURL + "/auth/me", token);
  if (response.status === 202) {
    res.status(200).render("story/story.post.ejs");
  } else {
    res.status(403).render("auth/login.ejs");
  }
}

export async function searchAddress(req, res, next) {
  const search = req.params.address;
  res.status(200).render("story/story.board.search.ejs", { search });
}

export async function renderDetailPage(req, res, next) {
  const storyId = req.params.id;
  res.status(200).render("story/story.detail.ejs", { storyId });
}

export async function renderUpdatePage(req, res, next) {
  const storyId = req.params.id;
  res.status(200).render("story/story.update.ejs", { storyId });
}

function filterNotEmptyString(obj) {
  Object.keys(obj).forEach((x) => obj[x] == "" && delete obj[x]);
  return obj;
}

export async function postStory(req, res, next) {
  const imgnames = req.files.map((img) => img.filename);
  const postStoryURL = config.backendURL + "/story";
  const token = req.cookies["token"];
  const bodyFilteredNotEmpty = filterNotEmptyString(req.body);
  const postData = { ...bodyFilteredNotEmpty, imgnames };
  const responseFromPostStoryAPI = await nodeFetch.fetchPostApiWithToken(postStoryURL, postData, token);
  if (responseFromPostStoryAPI.status === 201) {
    const responseParsed = await responseFromPostStoryAPI.json();
    const storyId = responseParsed.storyId;
    const isexist = fs.existsSync(`./uploads/story/story_${storyId}`);
    if (isexist) {
      return res.status(500).json({ msg: "Image directory of this id already exists" });
    } else {
      fs.mkdirSync(`./uploads/story/story_${storyId}`, (err) => res.status(500).json(err));
      imgnames.forEach((imgname) => {
        fs.renameSync(`./uploads/story/storyImg_temp/${imgname}`, `./uploads/story/story_${storyId}/${imgname}`);
      });
      return res.redirect("/story/detail/" + storyId);
    }
  } else {
    console.error("backend server error");
    return res.status(500).json({ msg: "can't create story or store images" });
  }
}

export async function updateStory(req, res) {
  const id = req.params.id;
  const imgnames = req.files.map((img) => img.filename);
  imgnames.forEach((imgname) => {
    fs.renameSync(`./uploads/story/storyImg_temp/${imgname}`, `./uploads/story/story_${id}/${imgname}`);
  });
  const putStoryURL = config.backendURL + "/story/" + id;
  const token = req.cookies["token"];
  const deleteImgnamesInReqBody = req.body.deleteImgnames;
  delete req.body.deleteImgnames;
  let deleteImgnames = [];
  if (Array.isArray(deleteImgnamesInReqBody)) {
    deleteImgnames = deleteImgnamesInReqBody;
  } else {
    deleteImgnames.push(deleteImgnamesInReqBody);
  }
  deleteImgnames.forEach((deleteImgname) => {
    fs.unlink(`./uploads/story/story_${id}/${deleteImgname}`, (err) => console.error(err));
  });
  const bodyFilteredNotEmpty = filterNotEmptyString(req.body);
  const postData = { ...bodyFilteredNotEmpty, imgnames, deleteImgnames };
  const responseFromPutStoryAPI = await nodeFetch.fetchPutApiWithToken(putStoryURL, postData, token);
  const { storyId } = await responseFromPutStoryAPI.json();
  if (responseFromPutStoryAPI.status === 200) {
    return res.redirect("/story/detail/" + storyId);
  } else if (responseFromPutStoryAPI.status === 400) {
    return res.redirect("/auth/login");
  } else if (responseFromPutStoryAPI.status === 403) {
    alert("삭제 권한이 없습니다.");
  } else if (responseFromPutStoryAPI.status === 404) {
    return res.redirect("/story");
  } else {
    return res.status(500).json({ msg: "fetch error" });
  }
}

export async function deleteStory(req, res, next) {
  try {
    const { IsAuthor } = await fetch(config.backendURL + "/shop/author/" + req.params.id, { method: "GET" });
    if (IsAuthor) {
      fs.rmSync(`./uploads/story/story_${req.params.id}`, {
        recursive: true,
        force: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
