import { HttpClient } from "../../network/fetch.js";
import { ShopDataComponent } from "./component/shopDataComponent.js";
import { ShopReplyComponent } from "./component/shopReplyComponent.js";

class ShopDetail {
  mobileNumber;
  constructor(http, deleteBtn, id, dataComponent, replyComponent) {
    this.http = http;
    this.deleteBtn = deleteBtn;
    this.dataComponent = dataComponent;
    this.replyComponent = replyComponent;
    this.getShopById(id)
      .then((res) => {
        this.mobileNumber = res.mobile;
        this.dataComponent.fillShopData(res);
        this.dataComponent.setCarousel(res.shopImages, id);
      })
      .then(async () => {
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

  setDeleteListener(listener) {
    this.deleteBtn.click(listener);
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

const http = new HttpClient();
const deleteBtn = $("#sell_deleteButton");
const shopData = new ShopDataComponent(selling, carousel);

const commentElements = {
  container: document.querySelector("#comments"),
  counter: document.querySelector("#comment-count"),
};
const shopReply = new ShopReplyComponent(commentElements);

const shop = new ShopDetail(http, deleteBtn, shopId, shopData, shopReply);
const deleteListener = async () => {
  try {
    await http.fetch("/shop/" + shopId, { method: "DELETE" });
    location.href = "/shop";
  } catch {
    alert("삭제권한이 없습니다.");
  }
};
shop.setDeleteListener(deleteListener);

$("#replyButton").click(() => {
  createComment(shopId);
});

async function createComment(shopId) {
  const content = $("#replyInput").val();
  const replyData = { shopId, content };
  try {
    await http.fetch("/shop/reply", {
      method: "POST",
      body: JSON.stringify(replyData),
    });
    location.reload();
  } catch (error) {
    alert("댓글을 작성할 수 없습니다. 나중에 시도해주세요.");
  }
}

async function createAccessableUser(userId) {
  http.fetch("/shop/mobile/" + shopId, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

window.createAccessableUser = createAccessableUser;
