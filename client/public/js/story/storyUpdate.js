const deleteImgContainer = selectById("deleteImgContainer");
const formButton = $("#form-button");
const buttonOuttaForm = $("#button-outta-form");
const inputImg = document.querySelector("#postImgInput");
const hiddenUpdateFormTag = selectById("hiddenUpdateFormTag");
let newImgCntLimit;

function checkImgCnt() {
  if (inputImg.files.length <= newImgCntLimit) {
    return true;
  }
  return false;
}

function postStoryValidation() {
  const essentialInput = $("#essentialInput");
  essentialInput.addClass("hidden");
  const formTitle = $("#form-title").val();
  const formAddress = $("#form-address").val();
  if (!(formTitle && formAddress)) {
    essentialInput.removeClass("hidden");
  } else {
    formButton.trigger("click");
  }
}

async function getStoryById(storyId) {
  const url = backendURL + "/story/" + storyId;
  const response = await fetchGetApiWithToken(url, token);
  const { imgnames, story } = await response.json();
  newImgCntLimit = 5 - imgnames.length;
  delete story.user;
  delete story.userId;
  delete story.createdAt;
  return { imgnames, story };
}

async function inputIntoElement(storyId) {
  const { imgnames, story } = await getStoryById(storyId);
  for (const key in story) {
    const element = selectById(`form-${key}`);
    if (story[key]) {
      element.value = story[key];
    }
  }
  const buttonIds = [];
  imgnames.forEach((imgname) => {
    const deleteImg = `<div id="${imgname}Div" class="border border-info rounded m-3"><img class="card-img-top" src="/${imgname}" class="d-block w-100" alt="..." />
      <button id = "${imgname}_Button" type="button" class="btn-close" aria-label="Close"></button><div>`;
    deleteImgContainer.innerHTML += deleteImg;
    buttonIds.push(`${imgname}_Button`);
  });
  buttonIds.forEach((btnId) => {
    $(`#${btnId}`).click(() => {
      const imgname = btnId.split("_")[0];
      hiddenUpdateFormTag.innerHTML += `<input class="hidden" name="deleteImgnames" value="${imgname}"/>`;
      newImgCntLimit++;
      $(`#${imgname}Div`).fadeOut();
    });
  });
}

buttonOuttaForm.click(() => {
  if (checkImgCnt()) {
    postStoryValidation();
  } else {
    alert(
      `추가로 업로드 가능한 이미지 개수는 최대 ${newImgCntLimit}개 입니다. 
      업로드 한 사진을 삭제하시면 추가 업로드 개수가 늘어납니다.`
    );
  }
});
