const carouselIndicators = selectById("carousel-indicators");
const carouselInner = selectById("carousel-inner");
const sell_stuff = selectById("sell_stuff");
const sell_author = selectById("sell_author");
const sell_mobile = selectById("sell_mobile");
const sell_createdAt = selectById("sell_createdAt");
const sell_price = selectById("sell_price");
const sell_description = selectById("sell_description");
const deleteButton = $("#sell_deleteButton");
const comments = selectById("comments");

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

async function getComments(shopId) {
  const url = backendURL + "/shop/reply/" + shopId;
  const response = await fetchGetApiWithToken(url, token);
  if (response.status === 200) {
    const replies = await response.json();
    replies.forEach((reply) => {
      const replyTime = alignTimeData(reply.createdAt);
      const comment = `
      <div class="card my-1" id="reply_card">
        <div class="card-header">이름 : ${reply.user.name} </div>
        <div class="card-body">
          <p class="card-text">댓글 : ${reply.content}</p>
          <h6 class="text-end">작성일 : ${replyTime}</h6>
        </div>
      </div>
      `;
      comments.innerHTML += comment;
    });
    console.log(replies.length);
    document.querySelector("#comment-count").innerHTML = replies.length;
  }
}

async function clickReplyPostButton(shopId) {
  const replyButton = $("#replyButton");
  replyButton.click(() => {
    createComment(shopId);
  });
}

async function createComment(shopId) {
  const content = $("#replyInput").val();
  const url = backendURL + "/shop/reply";
  const response = await fetchPostApiWithToken(url, token, { shopId, content });
  if (response.status === 201) {
    location.reload();
  } else {
    alert("에러가 발생했습니다.");
  }
}
