$("#button-outta-form").click(() => {
  if (document.querySelector("#update_address").value) {
    const formButton = $("#form-button");
    if (checkImgCnt()) {
      formButton.trigger("click");
    } else {
      alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
    }
  } else {
    alert("주소를 입력해주세요.");
  }
});

function checkImgCnt() {
  const inputImg = document.querySelector("#postImgInput");
  if (inputImg.files.length <= 5) {
    return true;
  }
  return false;
}

function visualizePaidCampsiteOptions(value) {
  if (value === "유료캠핑장") $("#paid_campsite_options").removeClass("hidden");
  else {
    $("#paid_campsite_options").addClass("hidden");
  }
}
window.visualizePaidCampsiteOptions = visualizePaidCampsiteOptions;
