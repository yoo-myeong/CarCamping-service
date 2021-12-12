let newImgCntLimit;

function visualize_paidCampsiteOptions(value) {
  if (value === "유료캠핑장") $("#paid_campsite_options").removeClass("hidden");
  else {
    $("#paid_campsite_options").addClass("hidden");
  }
}

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

function checkImgCnt() {
  const inputImg = document.querySelector("#postImgInput");
  if (
    (inputImg.files.length >= 1 || newImgCntLimit < 5) &&
    inputImg.files.length <= newImgCntLimit
  ) {
    return true;
  }
  return false;
}

async function inputIntoElement(storyId) {
  const url = backendURL + "/story/" + storyId;
  const response = await fetchGetApiWithToken(url, token);
  const story = await response.json();
  const content_data = {
    title: story.title,
    address: story.address,
    campsite: story.campsite,
    startTime: story.campsite_startTime,
    endTime: story.campsite_endTime,
    price: story.campsite_price,
    link: story.campsite_link,
    description: story.description,
  };

  for (const key in content_data) {
    const element = selectById(`form-${key}`);
    if (content_data[key]) {
      element.value = content_data[key];
    }
  }

  // 유료캠핑장이면 캠핑장정보 노출
  if (content_data.campsite === "유료캠핑장")
    $("#paid_campsite_options").removeClass("hidden");

  // 이미지 컨테이너에 이미지 삽입하고 삭제버튼 생성
  const deleteImgContainer = selectById("deleteImgContainer");
  const storyImages = story.storyImages;
  const buttonIds = [];
  storyImages.forEach((storyImage) => {
    const imgname = storyImage.imgname;
    const deleteImg = `
    <div id="${imgname}Div" class="border border-info rounded m-3">
      <img class="card-img-top" src="/story/story_${storyId}/${imgname}" class="d-block w-100" alt="..." />
      <button id = "${imgname}_Button" type="button" class="btn-close" aria-label="Close">
      </button>
    <div>`;
    deleteImgContainer.innerHTML += deleteImg;
    buttonIds.push(`${imgname}_Button`);
  });
  newImgCntLimit = 5 - storyImages.length;
  buttonIds.forEach((btnId) => {
    $(`#${btnId}`).click(() => {
      const hiddenUpdateFormTag = selectById("hiddenUpdateFormTag");
      const imgname = btnId.split("_")[0];
      hiddenUpdateFormTag.innerHTML += `<input class="hidden" name="deleteImgnames" value="${imgname}"/>`;
      newImgCntLimit++;
      $(`#${imgname}Div`).fadeOut();
    });
  });
}

const buttonOuttaForm = $("#button-outta-form");
buttonOuttaForm.click(() => {
  const formButton = $("#form-button");
  if (checkImgCnt()) {
    formButton.trigger("click");
  } else {
    alert(
      `
      이미지는 최소 1개 이상 업로드 하셔야 하며, 
      현재 추가로 업로드 가능한 이미지 개수는 최대 ${newImgCntLimit}개 입니다. 
      업로드 한 사진을 삭제하시면 추가 업로드 개수가 늘어납니다.`
    );
  }
});
