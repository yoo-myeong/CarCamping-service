const formButton = $("#form_button");
const postButton = $("#post_button");
const formImage = selectById("form_image");

function checkImgCnt() {
  if (formImage.files.length <= 5) {
    return true;
  }
  return false;
}

postButton.click(() => {
  if (checkImgCnt()) {
    formButton.trigger("click");
  } else {
    alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
  }
});
