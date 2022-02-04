import { HttpClient } from "../../network/fetch.js";
import { StoryArcodianComponent } from "./component/arcodian.js";
import { StoryContentComponent } from "./component/content.js";
import { StoryTagComponent } from "./component/tag.js";
import { StoryCarouselComponent } from "./component/carousel.js";
import { StroyHeart } from "./heart/stroyHeart.js";

class StoryDetail {
  story;
  constructor(http, storyHeart, id) {
    this.http = http;
    this.storyHeart = storyHeart;
    this.id = id;
  }

  static async build(http, storyHeart, id) {
    const instance = new StoryDetail(http, storyHeart, id);
    const story = await instance.http.fetch("/story/" + id, { method: "GET" });
    createMap(story.address);
    instance.story = story;
    story.createdAt = instance.alignTimeData(story.createdAt);
    return instance;
  }

  createComponent(component, data) {
    component.create(data);
  }

  alignTimeData(time) {
    return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
  }
}

const whiteHeart = {
  button: $("#heart-white"),
  count: document.querySelector("#whiteHeartCnt"),
};
const redHeart = {
  button: $("#heart-red"),
  count: document.querySelector("#redHeartCnt"),
};
const carousel = {
  indicators: document.querySelector("#carousel-indicators"),
  inner: document.querySelector("#carousel-inner"),
};

const http = new HttpClient();
const storyHeart = new StroyHeart(http, whiteHeart, redHeart);
storyHeart.getHeartState(storyId);

const tagComponent = new StoryTagComponent(document.querySelector(".card-header-container"));
const contentComponent = new StoryContentComponent("detail");
const carouselComponent = new StoryCarouselComponent(carousel);
const arcodianComponent = new StoryArcodianComponent(document.querySelector("#accordionFlush"));

StoryDetail.build(http, storyHeart, storyId).then(async (storyDetail) => {
  try {
    await http.fetch("/auth/me", { method: "GET" });
    storyDetail.createComponent(tagComponent, storyDetail.story.storyTags);
    const content_data = {
      title: storyDetail.story.title,
      address: storyDetail.story.address,
      campsite: storyDetail.story.campsite,
      description: storyDetail.story.description,
      createdAt: storyDetail.story.createdAt,
      name: storyDetail.story.user.name,
    };
    storyDetail.createComponent(contentComponent, content_data);
    if (storyDetail.story.campsite === "유료캠핑장") {
      const paid_campsite_info = {
        시작시간: storyDetail.story.campsite_startTime,
        마감시간: storyDetail.story.campsite_endTime,
        비용: storyDetail.story.campsite_price,
        웹사이트: storyDetail.story.campsite_link,
      };
      storyDetail.createComponent(arcodianComponent, paid_campsite_info);
    }
    storyDetail.createComponent(carouselComponent, storyDetail.story.storyImages);
  } catch {
    alert("로그인이 필요합니다.");
    location.replace("/auth/login");
  }
});
