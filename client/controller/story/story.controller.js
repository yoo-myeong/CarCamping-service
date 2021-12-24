import * as nodeFetch from "../../fetch/nodeFetch.js";
import fs from "fs";
import { config } from "../../config.js";

export async function rederBoarePage(req, res, next) {
  res.status(200).render("story/story.board.ejs");
}

export async function renderPostPage(req, res, next) {
  res.status(200).render("story/story.post.ejs");
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
  const filenames = req.files.map((img) => img.filename);
  const url = config.backendURL + "/story";
  const token = req.cookies["token"];

  req.body = filterNotEmptyString(req.body);

  const json = {
    ...req.body,
    imgnames: filenames,
  };

  const response = await nodeFetch.fetchPostApiWithToken(url, json, token);
  if (response.status === 201) {
    const response_JsonFormat = await response.json();
    const storyId = response_JsonFormat.storyId;
    const isexist = fs.existsSync(`./uploads/story/story_${storyId}`);
    if (isexist) {
      return res
        .status(500)
        .json({ msg: "Image directory with this id already exists" });
    } else {
      // storyId를 폴더로 생성해서 temp에 저장한 이미지 옮긴 후 storyId 반환
      fs.mkdirSync(`./uploads/story/story_${storyId}`, (err) =>
        res.status(500).json(err)
      );
      filenames.forEach((imgname) => {
        fs.renameSync(
          `./uploads/story/storyImg_temp/${imgname}`,
          `./uploads/story/story_${storyId}/${imgname}`
        );
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
  const filenames = req.files.map((img) => img.filename);
  // temp에 저장된 이미지 옮기기
  filenames.forEach((imgname) => {
    fs.renameSync(
      `./uploads/story/storyImg_temp/${imgname}`,
      `./uploads/story/story_${id}/${imgname}`
    );
  });

  const url = config.backendURL + "/story/" + id;
  const token = req.cookies["token"];
  const deleteImgnamesOfBody = req.body.deleteImgnames;
  delete req.body.deleteImgnames;

  // deleteimg가 하나 일 경우 배열이 아닌 상태로 전달받으므로 새로 전달할 배열 생성해서 push
  let deleteImgnames = [];
  if (Array.isArray(deleteImgnamesOfBody)) {
    deleteImgnames = deleteImgnamesOfBody;
  } else {
    deleteImgnames.push(deleteImgnamesOfBody);
  }
  // deleteImgnames의 이름을 가진 파일 비동기로 삭제
  deleteImgnames.forEach((deleteImgname) => {
    fs.unlink(`./uploads/story/story_${id}/${deleteImgname}`, (err) =>
      console.error(err)
    );
  });

  req.body = filterNotEmptyString(req.body);

  const json = {
    ...req.body,
    imgnames: filenames,
    deleteImgnames,
  };

  const response = await nodeFetch.fetchPutApiWithToken(url, json, token);
  const { storyId } = await response.json();
  if (response.status === 200) {
    return res.redirect("/story/detail/" + storyId);
  } else if (response.status === 400) {
    return res.redirect("/auth/login");
  } else if (response.status === 403) {
    alert("삭제 권한이 없습니다.");
  } else if (response.status === 404) {
    return res.redirect("/story");
  } else {
    return res.status(500).json({ msg: "fetch error" });
  }
}

export async function deleteStory(req, res, next) {
  fs.rmSync(`./uploads/story/story_${req.params.id}`, {
    recursive: true,
    force: true,
  });
}
