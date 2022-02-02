import { HttpClient } from "../../network/fetch.js";
import { TagList } from "./taglist/taglist.js";
const http = new HttpClient();

const tagContainer = document.querySelector("#tagContainer");
const tag = new TagList(http, tagContainer);
tag.createTagBox();
