const form_button = $("#form_button");
const post_button = $("#post_button");
const form_image = selectById("form_image");

function checkImgCnt() {
  if (form_image.files.length <= 5) {
    return true;
  }
  return false;
}

post_button.click(() => {
  if (checkImgCnt()) {
    form_button.trigger("click");
  } else {
    alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
  }
});
