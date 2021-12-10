const formButton = $("#form-button");
const buttonOuttaForm = $("#button-outta-form");
const inputImg = document.querySelector("#postImgInput");

function visualize_paidCampsiteOptions(value) {
  if (value === "유료캠핑장") $("#paid_campsite_options").removeClass("hidden");
  else {
    $("#paid_campsite_options").addClass("hidden");
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
    formButton.trigger("click");
  } else {
    alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
  }
});
