const form_button = $("#form_button");
const post_button = $("#post_button");
const form_image = selectById("form_image");

function postShopValidation() {
  const form_stuff = $("#form_stuff").val();
  const form_price = $("#form_price").val();
  const form_mobile = $("#form_mobile").val();
  if (!(form_stuff && form_price && form_mobile)) {
    alert("판매물건, 가격, 연락처는 필수 기입사항입니다.");
  } else {
    form_button.trigger("click");
  }
}

function checkImgCnt() {
  if (form_image.files.length <= 5) {
    return true;
  }
  return false;
}

post_button.click(() => {
  if (checkImgCnt()) {
    postShopValidation();
  } else {
    alert("업로드 가능한 이미지 개수는 최대 5개 입니다.");
  }
});
