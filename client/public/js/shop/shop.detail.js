const carouselIndicators = selectById("carousel-indicators");
const carouselInner = selectById("carousel-inner");
const sell_stuff = selectById("sell_stuff");
const sell_author = selectById("sell_author");
const sell_mobile = selectById("sell_mobile");
const sell_createdAt = selectById("sell_createdAt");
const sell_price = selectById("sell_price");
const sell_transaction = selectById("sell_transaction");
const sell_transtype = selectById("sell_transtype");
const sell_description = selectById("sell_description");
const deleteButton = $("#sell_deleteButton");
const comments = selectById("comments");
let mobile_number;
deleteButton.click(async () => {
  console.log("clicked");
  const url = backendURL + "/shop/" + shopId;
  const response = await fetchDeleteApiWithToken(url, token);
  if (response.status === 204) {
    // 백엔드서버에서 인증된 후 삭제성공하면 프론트엔드서버 삭제요청
    $.ajax({
      method: "DELETE",
      url: `/shop/${shopId}`,
    });
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
  inputIntoInnerText(stuff, sell_stuff);
  inputIntoInnerText(alignedTime, sell_createdAt);
  inputIntoInnerText(price, sell_price);
  inputIntoInnerText(transaction, sell_transaction);
  inputIntoInnerText(transtype, sell_transtype);
  inputIntoInnerText(description, sell_description);
  inputIntoInnerText(user.name, sell_author);
  mobile_number = mobile;
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
        ? `<div class="carousel-item active"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`;
    if (i >= 1) {
      carouselIndicators.innerHTML += bottomButton;
    }
    carouselInner.innerHTML += carouselImg;
    i++;
  });
}

async function getComments(shopId) {
  // 댓글 가져오기
  const response = await fetchGetApiWithToken(
    backendURL + "/shop/reply/" + shopId,
    token
  );
  if (response.status === 200) {
    const replies = await response.json();
    const accessMobiles = await fetchGetApiWithToken(
      backendURL + "/shop/mobile/" + shopId,
      token
    );
    const accessMobiles_JSON = await accessMobiles.json();
    const AccessIds = accessMobiles_JSON.map(
      (accessmobile) => accessmobile.userId
    );

    // 게시글 작성자인지 확인
    const writerAuthResponse = await fetchGetApiWithToken(
      backendURL + "/shop/author/" + shopId,
      token
    );

    // 접속자의 userId 확인 후 연락처를 노출
    const { userId } = await writerAuthResponse.json();
    if (AccessIds.includes(userId)) {
      inputIntoInnerText(mobile_number, sell_mobile);
    } else {
      inputIntoInnerText("010-****-****", sell_mobile);
    }

    replies.forEach(async (reply) => {
      let disableTEXT = "";
      let onclinkTEXT = "";
      if (AccessIds.includes(reply.userId)) {
        disableTEXT = "disabled";
      } else {
        onclinkTEXT = `onclick = "postAccessMobile(${reply.userId})"`;
      }

      //작성자면 연락처공유 버튼 생성
      let accessBtn = "";
      if (writerAuthResponse.status === 200) {
        accessBtn = `<button type="button" class="btn btn-secondary btn-sm ms-3" ${onclinkTEXT} ${disableTEXT}>
                        연락처공유
                     </button>`;
      }

      // 댓글 생성
      const replyTime = alignTimeData(reply.createdAt);
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

async function postAccessMobile(userId) {
  await fetchPostApiWithToken(backendURL + "/shop/mobile/" + shopId, token, {
    userId,
  });
  location.reload();
}
