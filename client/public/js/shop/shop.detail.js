const sellingStuff = selectById("sell_stuff");
const sellingAuthor = selectById("sell_author");
const sellingMobile = selectById("sell_mobile");
const sellingCreatedAt = selectById("sell_createdAt");
const sellingPrice = selectById("sell_price");
const sellingTransaction = selectById("sell_transaction");
const sellingTranstype = selectById("sell_transtype");
const sellingDescription = selectById("sell_description");

let mobile_number;

$("#sell_deleteButton").click(async () => {
  const shopDetailURL = backendURL + "/shop/" + shopId;
  const response = await fetchDeleteApiWithToken(shopDetailURL);
  if (response.status === 204) {
    $.ajax({
      method: "DELETE",
      url: `/shop/${shopId}`,
    });
    location.href = "/shop";
  } else if (response.status === 403) {
    alert("삭제권한이 없습니다.");
  }
});

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

async function fillDetailShopData(shopId) {
  const carouselIndicators = selectById("carousel-indicators");
  const carouselInner = selectById("carousel-inner");
  const url = backendURL + "/shop/" + shopId;
  const response = await fetchGetApiWithToken(url);
  const {
    stuff,
    mobile,
    createdAt,
    price,
    description,
    transaction,
    shopImages,
    transtype,
    user,
  } = await response.json();
  const alignedTime = alignTimeData(createdAt);
  inputIntoInnerText(stuff, sellingStuff);
  inputIntoInnerText(alignedTime, sellingCreatedAt);
  inputIntoInnerText(price, sellingPrice);
  inputIntoInnerText(transaction, sellingTransaction);
  inputIntoInnerText(transtype, sellingTranstype);
  inputIntoInnerText(description, sellingDescription);
  inputIntoInnerText(user.name, sellingAuthor);
  mobile_number = mobile;
  shopImages.forEach((shopImg, i) => {
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
        ? `<div class="carousel-item active"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`;
    if (i >= 1) {
      carouselIndicators.innerHTML += bottomButton;
    }
    carouselInner.innerHTML += carouselImg;
  });
}

async function getComments(shopId) {
  const responseFromGetReplyAPI = await fetchGetApiWithToken(
    backendURL + "/shop/reply/" + shopId
  );
  if (responseFromGetReplyAPI.status === 200) {
    const replies = await responseFromGetReplyAPI.json();
    const accessableUsers = await fetchGetApiWithToken(
      backendURL + "/shop/mobile/" + shopId
    );
    const accessableUsersParsed = await accessableUsers.json();
    const accessableUserIds = accessableUsersParsed.map(
      (accessalbeUser) => accessalbeUser.userId
    );
    const shopAuthorURL = backendURL + "/shop/author/" + shopId;
    const responseGetWriterAPI = await fetchGetApiWithToken(shopAuthorURL);
    const { userId } = await responseGetWriterAPI.json();

    accessableUserIds.includes(userId)
      ? inputIntoInnerText(mobile_number, sell_mobile)
      : inputIntoInnerText("010-****-****", sell_mobile);

    replies.forEach(async (reply) => {
      let disableTEXT = "";
      let onclinkTEXT = "";
      let accessBtn = "";
      accessableUserIds.includes(reply.userId)
        ? (disableTEXT = "disabled")
        : (onclinkTEXT = `onclick = "createAccessableUser(${reply.userId})"`);

      if (responseGetWriterAPI.status === 200) {
        accessBtn = `
        <button type="button" class="btn btn-secondary btn-sm ms-3" ${onclinkTEXT} ${disableTEXT}>
          연락처공유
        </button>`;
      }

      const replyTime = alignTimeData(reply.createdAt);
      const comments = selectById("comments");
      const comment = `
      <div class="card my-1" id="reply_card">
          <div class="card-header d-flex justify-content-between">
            <div><p>이름 : ${reply.user.name}</p></div>
            <div>
              <span class="text-end">작성일 : ${replyTime}</span>
              ${accessBtn}
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">${reply.content}</p>
          </div>
      </div>
      `;
      comments.innerHTML += comment;
    });
    document.querySelector("#comment-count").innerHTML = replies.length;
  }
}

$("#replyButton").click(() => {
  createComment(shopId);
});

async function createComment(shopId) {
  const content = $("#replyInput").val();
  const postReplyURL = backendURL + "/shop/reply";
  const postData = { shopId, content };
  const response = await fetchPostApiWithToken(postReplyURL, postData);
  if (response.status === 201) {
    location.reload();
  } else {
    alert("댓글을 작성할 수 없습니다. 나중에 시도해주세요.");
  }
}

async function createAccessableUser(userId) {
  const postData = { userId };
  await fetchPostApiWithToken(backendURL + "/shop/mobile/" + shopId, postData);
  location.reload();
}
