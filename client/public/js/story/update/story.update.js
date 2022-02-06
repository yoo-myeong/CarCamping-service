import { HttpClient } from "../../network/fetch.js";
import { StoryContentComponent } from "../detail/component/content.js";
import { TagList } from "../post/taglist/taglist.js";
import { StoryImageComponent } from "./component/carousel.js";

class StoryUpdate {
  story;
  constructor(http) {
    this.http = http;
  }

  static async build(http, id) {
    const instance = new StoryUpdate(http);
    instance.story = await http.fetch("/story/" + id, { method: "GET" });
    return instance;
  }

  createComponent(component, data) {
    component.create(data);
  }
}

const http = new HttpClient();

const contentCopmonent = new StoryContentComponent("update");
const ImgComponent = new StoryImageComponent(
  document.querySelector("#deleteImgContainer"),
  storyId,
  document.querySelector("#hiddenUpdateFormTag")
);
const tagComponent = new TagList(http, document.querySelector("#tagContainer"));

StoryUpdate.build(http, storyId).then((storyUpdate) => {
  if (storyUpdate.story.campsite === "유료캠핑장") {
    $("#paid_campsite_options").removeClass("hidden");
  }
  const contentData = {
    title: storyUpdate.story.title,
    address: storyUpdate.story.address,
    campsite: storyUpdate.story.campsite,
    startTime: storyUpdate.story.campsite_startTime,
    endTime: storyUpdate.story.campsite_endTime,
    price: storyUpdate.story.campsite_price,
    link: storyUpdate.story.campsite_link,
    description: storyUpdate.story.description,
  };
  storyUpdate.createComponent(contentCopmonent, contentData);
  storyUpdate.createComponent(ImgComponent, storyUpdate.story.storyImages);
  storyUpdate.createComponent(tagComponent, storyUpdate.story.storyTags);
});

const buttonOuttaForm = $("#button-outta-form");
buttonOuttaForm.click(() => {
  if (document.querySelector("#update_address").value) {
    const formButton = $("#update_button");
    if (checkImgCnt(ImgComponent.newImgCntLimit)) {
      formButton.trigger("click");
    } else {
      alert(
        `
      이미지는 총 최소 1개 이상, 5개 이하로 업로드 하셔야 하며, 
      현재 추가로 업로드 가능한 이미지 개수는 최대 ${ImgComponent.newImgCntLimit}개 입니다. 
      업로드 한 사진을 삭제하시면 추가 업로드 개수가 늘어납니다.`
      );
    }
  }
});

function checkImgCnt(newImgCntLimit) {
  const inputImg = document.querySelector("#postImgInput");
  if ((inputImg.files.length >= 1 || newImgCntLimit < 5) && inputImg.files.length <= newImgCntLimit) {
    return true;
  }
  return false;
}
