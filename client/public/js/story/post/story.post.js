import { HttpClient } from "../../network/fetch.js";
import { TagList } from "./taglist/taglist.js";
const http = new HttpClient();
http
  .fetch("/auth/me", { method: "GET" })
  .then(() => {
    const tagContainer = document.querySelector("#tagContainer");
    const tag = new TagList(http, tagContainer);
    tag.createTagBox();
  })
  .catch(() => {
    alert("로그인이 필요합니다.");
    location.replace("/auth/login");
  });
