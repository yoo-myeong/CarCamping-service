import { HttpClient } from "../../network/fetch.js";

class StoryBoard {
  constructor(http, cardBox) {
    this.http = http;
    this.cardBox = cardBox;
  }
  async createStoryCards(stories) {
    cardBox.innerHTML = "";
    stories.forEach((story) => {
      let { title, address, id, createdAt, user, storyImages } = story;
      const thumbnail = storyImages[0].imgname;
      const name = user.name;
      const storyCardComponent = `
            <div href="#">
                <div class="col">
                    <a href="/story/detail/${id}">
                    <div class="card">
                        <img
                            alt="/img/noimg.png"
                            src="/story/story_${id}/${thumbnail}"
                            class="card-img-top"
                        />
                        <div class="card-body">
                            <h5 class="card-title">제목 : ${title}</h5>
                            <p class="author">작성자 : ${name}</p>
                            <p class="place">주소 : ${address}</p>
                            <p class="date">작성일 : ${createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
            `;
      cardBox.innerHTML += storyCardComponent;
    });
  }

  async getStory(query) {
    const additionalURL = !query ? "" : query === "heart" ? "/heart/stories" : "/?sort=" + query;
    let url;
    if (additionalURL === "/heart/stories") {
      url = additionalURL;
    } else if (additionalURL) {
      url = "/story" + additionalURL;
    } else {
      url = "/story";
    }
    try {
      const response = await this.http.fetch(url, { method: "GET" });
      this.createStoryCards(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getMyStory() {
    try {
      const { username } = await this.authRequest();
      const url = `/story?username=${username}`;
      const stories = await this.http.fetch(url, { method: "GET" });
      this.createStoryCards(stories);
    } catch {
      location.href = "/auth/login";
    }
  }

  sortStory(opt) {
    this.getStory(opt.value);
  }

  async getSearchStory(search) {
    try {
      await this.authRequest();
      const encodedSearch = encodeURI(search);
      const url = "/story?search=" + encodedSearch;
      const stories = await this.http.fetch(url, { method: "GET" });
      this.createStoryCards(stories);
    } catch {
      location.href = "/auth/login";
    }
  }

  async authRequest() {
    return this.http.fetch("/auth/me", { method: "GET" });
  }
}

const http = new HttpClient();
const cardBox = document.getElementById("cardBox");
const board = new StoryBoard(http, cardBox);
try {
  board.getSearchStory(search);
} catch {
  board.getStory();
}

function getMyStory() {
  board.getMyStory();
}
window.getMyStory = getMyStory;
function sortStory(opt) {
  board.sortStory(opt);
}
window.sortStory = sortStory;
