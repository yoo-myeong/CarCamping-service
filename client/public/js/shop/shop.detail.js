const carouselIndicators = selectById("carousel-indicators");
const carouselInner = selectById("carousel-inner");
const sell_stuff = selectById("sell_stuff");
const sell_author = selectById("sell_author");
const sell_mobile = selectById("sell_mobile");
const sell_createdAt = selectById("sell_createdAt");
const sell_price = selectById("sell_price");
const sell_description = selectById("sell_description");
const deleteButton = $("#sell_deleteButton");

deleteButton.click(async () => {
  console.log("clicked");
  const url = backendURL + "/shop/" + shopId;
  const response = await fetchDeleteApiWithToken(url, token);
  if (response.status === 204) {
    location.href = "/shop";
  } else if (response.status === 403) {
    alert("삭제권한이 없습니다.");
  } else {
    location.href = "/error";
  }
});

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

async function makeDetailShop(shopId) {
  const url = backendURL + "/shop/" + shopId;
  const response = await fetchGetApiWithToken(url, token);
  const { stuff, mobile, createdAt, price, description, shopImages, user } =
    await response.json();
  const alignedTime = alignTimeData(createdAt);
  inputIntoInnerText(stuff, sell_stuff);
  inputIntoInnerText(mobile, sell_mobile);
  inputIntoInnerText(alignedTime, sell_createdAt);
  inputIntoInnerText(price, sell_price);
  inputIntoInnerText(description, sell_description);
  inputIntoInnerText(user.name, sell_author);

  let i = 0;
  shopImages.forEach((shopImg) => {
    const imgname = shopImg.imgname;
    const bottomButton = `
      <button
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to="${i}"
      aria-current="true"
      aria-label="Slide ${i + 1}"
      >
      </button>`;
    const carouselImg =
      i == 0
        ? `<div class="carousel-item active"><img src="/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/${imgname}" class="d-block w-100" /></div>`;
    if (i >= 1) {
      carouselIndicators.innerHTML += bottomButton;
    }
    carouselInner.innerHTML += carouselImg;
    i++;
  });
}
