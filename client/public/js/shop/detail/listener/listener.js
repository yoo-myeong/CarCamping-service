import { HttpClient } from "../../../network/fetch.js";

const http = new HttpClient();

async function createComment(shopId) {
  const content = $("#replyInput").val();
  const replyData = { shopId, content };
  try {
    await http.fetch("/shop/reply", {
      method: "POST",
      body: JSON.stringify(replyData),
    });
    location.reload();
  } catch (error) {
    alert("댓글을 작성할 수 없습니다. 나중에 시도해주세요.");
  }
}

async function createAccessableUser(userId) {
  await http.fetch("/shop/mobile/" + shopId, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  location.reload();
}

const deleteBtn = $("#sell_deleteButton");
const deleteListener = async () => {
  try {
    await http.fetch("/shop/" + shopId, { method: "DELETE" });
    fetch("/shop/" + shopId, {
      method: "DELETE",
    });
    location.href = "/shop";
  } catch {
    alert("삭제권한이 없습니다.");
  }
};
deleteBtn.click(deleteListener);

window.createAccessableUser = createAccessableUser;
window.createComment = createComment;
