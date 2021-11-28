const carouselIndicators = selectById("carousel-indicators");
const carouselInner = selectById("carousel-inner");
const detailDeleteButton = $("#detail_deleteButton");
const dtailUpdateButton = $("#deatail_updateButton");
const redHeartButton = $("#heart-red");
const whiteHeartButton = $("#heart-white");
const whiteHeartCnt = selectById("whiteHeartCnt");
const redHeartCnt = selectById("redHeartCnt");

dtailUpdateButton.click(async () => {
  const response = await fetchGetApiWithToken(
    backendURL + "/story/author/" + storyId,
    token
  );
  if (response.status === 200) {
    location.href = "/story/update/" + storyId;
  } else {
    alert("수정권한이 없습니다.");
  }
});

detailDeleteButton.click(async () => {
  const url = backendURL + "/story/" + storyId;
  const response = await fetchDeleteApiWithToken(url, token);
  if (response.status === 204) {
    location.href = "/story";
  } else if (response.status === 403) {
    alert("삭제권한이 없습니다.");
  } else {
    location.href = "/error";
  }
});

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

async function makeDetailStory(storyId) {
  const url = backendURL + "/story/" + storyId;
  const response = await fetchGetApiWithToken(url, token);
  const { imgnames, story } = await response.json();
  let i = 0;
  const name = story.user.name;
  inputIntoInnerText(name, selectById("detail_name"));
  story.createdAt = alignTimeData(story.createdAt);
  delete story.user;
  delete story.userId;
  for (const key in story) {
    const element = selectById(`detail_${key}`);
    if (story[key]) {
      inputIntoInnerText(story[key], element);
    } else {
      inputIntoInnerText("없음", element);
    }
  }
  imgnames.forEach((imgname) => {
    const bottomButton = `
    <button
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide-to="${i}"
    aria-current="true"
    aria-label="Slide ${i + 1}"
    >
    </button>`;
    const carouselImg =
      i == 0
        ? `<div class="carousel-item active"><img src="/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/${imgname}" class="d-block w-100" /></div>`;
    if (i >= 1) {
      carouselIndicators.innerHTML += bottomButton;
    }
    carouselInner.innerHTML += carouselImg;
    i++;
  });
}

function exposeWhiteHeart() {
  whiteHeartButton.removeClass("hidden");
  redHeartButton.addClass("hidden");
}
function exposeRedHeart() {
  redHeartButton.removeClass("hidden");
  whiteHeartButton.addClass("hidden");
}
function updateHeartCnt(heartCnt) {
  redHeartCnt.innerText = heartCnt;
  whiteHeartCnt.innerText = heartCnt;
}

async function getHeartState(storyId) {
  const url = backendURL + "/story/heart/" + storyId;
  const response = await fetchGetApiWithToken(url, token);
  if (response.status === 200) {
    exposeRedHeart();
  } else {
    exposeWhiteHeart();
  }
  const { heartCnt } = await response.json();
  updateHeartCnt(heartCnt);
}

async function activateHeartButton(storyId) {
  whiteHeartButton.click(async () => {
    const url = backendURL + "/story/heart";
    const response = await fetchPostApiWithToken(url, token, { storyId });
    const { heartCnt } = await response.json();
    updateHeartCnt(heartCnt);
    exposeRedHeart();
  });
  redHeartButton.click(async () => {
    const url = backendURL + "/story/heart/" + storyId;
    const response = await fetchDeleteApiWithToken(url, token);
    const { heartCnt } = await response.json();
    updateHeartCnt(heartCnt);
    exposeWhiteHeart();
  });
}
