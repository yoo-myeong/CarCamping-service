function visualize_paidCampsiteOptions(value) {
  if (value === "유료캠핑장") $("#paid_campsite_options").removeClass("hidden");
  else {
    $("#paid_campsite_options").addClass("hidden");
  }
}

function checkImgCnt() {
  const inputImg = document.querySelector("#postImgInput");
  if (inputImg.files.length <= 5) {
    return true;
  }
  return false;
}

const buttonOuttaForm = $("#button-outta-form");
buttonOuttaForm.click(() => {
  const formButton = $("#form-button");
  if (checkImgCnt()) {
    formButton.trigger("click");
  } else {
    alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
  }
});
