function visualizePaidCampsiteOptions(value) {
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

$("#button-outta-form").click(() => {
  if (document.querySelector("#form-address").value) {
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

async function createTagCheckbox() {
  const url = backendURL + "/taglist";
  const response = await fetchGetApiWithToken(url);
  const tagnames = await response.json();
  tagnames.forEach((tagname, index) => {
    const tag = tagname.tagname;
    const code = `
    <input
      type="checkbox"
      class="btn-check"
      id="btncheck${index}"
      autocomplete="off"
      name="tags"
      value="${tag}"
    />
    <label class="btn btn-outline-success" for="btncheck${index}"
      >${tag}</label
    >
    `;
    document.querySelector("#tagContainer").innerHTML += code;
  });
}
createTagCheckbox();
