const formButton = $("#form-button");
const buttonOuttaForm = $("#button-outta-form");
const inputImg = document.querySelector("#postImgInput");

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

function checkImgCnt() {
  if (inputImg.files.length <= 5) {
    return true;
  }
  return false;
}

buttonOuttaForm.click(() => {
  if (checkImgCnt()) {
    postStoryValidation();
  } else {
    alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
  }
});
