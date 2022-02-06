import { HttpClient } from "../../../network/fetch.js";
const http = new HttpClient();

$("#deatail_updateButton").click(async () => {
  try {
    await http.fetch("/story/author/" + storyId, { method: "GET" });
    location.href = "/story/update/" + storyId;
  } catch (error) {
    alert("수정권한이 없습니다.");
  }
});

$("#detail_deleteButton").click(async () => {
  try {
    await http.fetch("/story/" + storyId, { method: "DELETE" });
    $.ajax({
      method: "DELETE",
      url: `/story/${storyId}`,
    });
    location.href = "/story";
  } catch (error) {
    console.error(error);
    alert("삭제권한이 없습니다.");
  }
});
