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
  if (document.querySelector("#form-address").value) {
    const formButton = $("#form-button");
    if (checkImgCnt()) {
      formButton.trigger("click");
    } else {
      alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
    }
  } else {
    // 주소 입력창은 readonly가 적용되어 required를 사용할 수 없어서 JS로 검증
    alert("주소를 입력해주세요.");
  }
});
