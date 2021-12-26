const cardBox = document.getElementById("cardBox");

async function createStoryCards(stories) {
  cardBox.innerHTML = "";
  if (stories.status !== 200) {
    console.error({ message: "getting stories failed" });
  } else {
    const storiesParsed = await stories.json();
    storiesParsed.forEach((story) => {
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
}

async function getStory(query) {
  const additionalURL = !query
    ? ""
    : query === "heart"
    ? "/heart/stories"
    : "/?sort=" + query;

  if (username) {
    const url = backendURL + "/story" + additionalURL;
    const response = await fetchGetApiWithToken(url);
    createStoryCards(response);
  } else {
    location.href = "/auth/login";
  }
}

async function getMyStory() {
  if (username) {
    const url = backendURL + `/story?username=${username}`;
    const stories = await fetchGetApiWithToken(url, username);
    createStoryCards(stories);
  } else {
    location.href = "/auth/login";
  }
}

function sortStory(opt) {
  getStory(opt.value);
}
async function getSearchStory(search) {
  if (username) {
    const encodedSearch = encodeURI(search);
    const url = backendURL + "/story?search=" + encodedSearch;
    const stories = await fetchGetApiWithToken(url);
    createStoryCards(stories);
  } else {
    location.href = "/auth/login";
  }
}
