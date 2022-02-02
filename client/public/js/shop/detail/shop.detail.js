import { HttpClient } from "../../network/fetch.js";
import { ShopContentComponent } from "./component/content.js";
import { ShopReplyComponent } from "./component/reply.js";

class ShopDetail {
  mobileNumber;
  constructor(http, id, dataComponent, replyComponent) {
    this.http = http;
    this.dataComponent = dataComponent;
    this.replyComponent = replyComponent;
    this.getShopById(id).then(async (shop) => {
      this.mobileNumber = shop.mobile;
      this.dataComponent.fillTextData(shop);
      this.dataComponent.setOnImage(shop.shopImages, id);
      let replies;
      let AccessableUserIds;
      let userId;
      let IsAuthor;
      try {
        replies = await this.getCommentsById(id);
        const userIds = await this.getAccessUsers(id);
        AccessableUserIds = userIds.map((user) => user.userId);
        const res = await this.getAuthor(id);
        userId = res.userId;
        IsAuthor = res.IsAuthor;
      } catch (error) {
        throw error;
      }
      IsAuthor || AccessableUserIds.includes(userId)
        ? (this.dataComponent.selling.mobile.innerText += this.mobileNumber)
        : (this.dataComponent.selling.mobile.innerText += "010-xxxx-xxxx");
      replies.forEach((reply) => {
        this.replyComponent.createComment(reply, IsAuthor, AccessableUserIds);
      });
    });
  }

  async getShopById(id) {
    return this.http.fetch("/shop/" + id, { method: "GET" });
  }

  async getCommentsById(id) {
    return this.http.fetch("/shop/reply/" + id, { method: "GET" });
  }

  async getAccessUsers(id) {
    return this.http.fetch("/shop/mobile/" + id, { method: "GET" });
  }

  async getAuthor(id) {
    return this.http.fetch("/shop/author/" + id, { method: "GET" });
  }
}

const selling = {
  stuff: document.querySelector("#sell_stuff"),
  author: document.querySelector("#sell_author"),
  mobile: document.querySelector("#sell_mobile"),
  createdAt: document.querySelector("#sell_createdAt"),
  price: document.querySelector("#sell_price"),
  transaction: document.querySelector("#sell_transaction"),
  transtype: document.querySelector("#sell_transtype"),
  description: document.querySelector("#sell_description"),
};
const carouselIndicators = document.querySelector("#carousel-indicators");
const carouselInner = document.querySelector("#carousel-inner");
const carousel = { carouselIndicators, carouselInner };
const commentElements = {
  container: document.querySelector("#comments"),
  counter: document.querySelector("#comment-count"),
};

const http = new HttpClient();
const shopData = new ShopContentComponent(selling, carousel);
const shopReply = new ShopReplyComponent(commentElements);
new ShopDetail(http, shopId, shopData, shopReply);
