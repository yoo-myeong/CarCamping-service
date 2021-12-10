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
  const story = await response.json();
  const content_data = {
    title: story.title,
    address: story.address,
    campsite: story.campsite,
    description: story.description,
    createdAt: story.createdAt,
  };
  const name = story.user.name;
  inputIntoInnerText(name, selectById("detail_name"));
  content_data.createdAt = alignTimeData(content_data.createdAt);
  
  // 내용 삽입
  for (const key in content_data) {
    const element = selectById(`detail_${key}`);
    if (content_data[key]) {
      inputIntoInnerText(content_data[key], element);
    } else {
      inputIntoInnerText("없음", element);
    }
  }

  // tag 삽입
  const storyTags = story.storyTags
  const description_body = selectById("description_body")
  storyTags.forEach((storyTag)=>{
    const tag = storyTag.tag
    description_body.innerHTML+= `<button class="btn btn-primary me-2" disabled>#${tag}</button>` 
  })

  // 유료캠핑 아코디언
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

  // 이미지 캐러셀 슬라이딩 기능 구현
  const storyImages = story.storyImages;
  let i = 0;
  storyImages.forEach((storyImage) => {
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
