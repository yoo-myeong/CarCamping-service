const carouselIndicators = selectById("carousel-indicators");
const carouselInner = selectById("carousel-inner");
const whiteHeartCnt = selectById("whiteHeartCnt");
const redHeartCnt = selectById("redHeartCnt");
const redHeartButton = $("#heart-red");
const whiteHeartButton = $("#heart-white");

whiteHeartButton.click(async () => {
  const url = backendURL + "/story/heart";
  const response = await fetchPostApiWithToken(url, { storyId });
  const { heartCnt } = await response.json();
  updateHeartCnt(heartCnt);
  exposeRedHeart();
});
redHeartButton.click(async () => {
  const url = backendURL + "/story/heart/" + storyId;
  const response = await fetchDeleteApiWithToken(url);
  const { heartCnt } = await response.json();
  updateHeartCnt(heartCnt);
  exposeWhiteHeart();
});

$("#deatail_updateButton").click(async () => {
  const checkAuthURL = backendURL + "/story/author/" + storyId;
  const response = await fetchGetApiWithToken(checkAuthURL);
  if (response.status === 200) {
    location.href = "/story/update/" + storyId;
  } else {
    alert("수정권한이 없습니다.");
  }
});

$("#detail_deleteButton").click(async () => {
  const deleteStoryURL = backendURL + "/story/" + storyId;
  const response = await fetchDeleteApiWithToken(deleteStoryURL);
  if (response.status === 204) {
    $.ajax({
      method: "DELETE",
      url: `/story/${storyId}`,
    });
    location.href = "/story";
  } else {
    alert("삭제권한이 없습니다.");
  }
});

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

async function fillDetailStory(storyId) {
  const getStoryDetailURL = backendURL + "/story/" + storyId;
  const response = await fetchGetApiWithToken(getStoryDetailURL);
  const story = await response.json();
  const content_data = {
    title: story.title,
    address: story.address,
    campsite: story.campsite,
    description: story.description,
    createdAt: story.createdAt,
  };
  content_data.createdAt = alignTimeData(content_data.createdAt);
  const name = story.user.name;
  inputIntoInnerText(name, selectById("detail_name"));

  const insertContents = new Promise(() => {
    for (const key in content_data) {
      const element = selectById(`detail_${key}`);
      if (content_data[key]) {
        inputIntoInnerText(content_data[key], element);
      } else {
        inputIntoInnerText("없음", element);
      }
    }
  });

  createMap(content_data.address);

  const insertTags = new Promise(() => {
    const storyTags = story.storyTags;
    const cardHeader = document.querySelector(".card-header-container");
    storyTags.forEach((storyTag) => {
      const tag = storyTag.tag;
      cardHeader.innerHTML += `<button class="tagBtn btn btn-primary me-2" disabled>#${tag}</button>`;
    });
  });

  const createInfoOfPaidCampSite = new Promise(() => {
    const paid_campsite_info = {
      시작시간: story.campsite_startTime,
      마감시간: story.campsite_endTime,
      비용: story.campsite_price,
      웹사이트: story.campsite_link,
    };
    if (content_data.campsite === "유료캠핑장") {
      const arcodianFlush = selectById("accordionFlush");
      for (const key in paid_campsite_info) {
        if (paid_campsite_info[key]) {
          arcodianFlush.innerHTML += `<div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              ${key}
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              ${paid_campsite_info[key]}
            </div>
          </div>
      </div>`;
        }
      }
    }
  });

  const createImgCarrasel = new Promise(() => {
    const storyImages = story.storyImages;
    storyImages.forEach((storyImage, i) => {
      const imgname = storyImage.imgname;
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
          ? `<div class="carousel-item active">
            <img src="/story/story_${storyId}/${imgname}" class="d-block w-100 h-100" />
          </div>`
          : `<div class="carousel-item">
            <img src="/story/story_${storyId}/${imgname}" class="d-block w-100 h-100" />
          </div>`;
      if (i >= 1) {
        carouselIndicators.innerHTML += bottomButton;
      }
      carouselInner.innerHTML += carouselImg;
    });
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
  const response = await fetchGetApiWithToken(url);
  if (response.status === 200) {
    exposeRedHeart();
  } else {
    exposeWhiteHeart();
  }
  const { heartCnt } = await response.json();
  updateHeartCnt(heartCnt);
}
