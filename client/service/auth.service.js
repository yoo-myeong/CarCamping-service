import fetch from "node-fetch";

export async function fetchPostApi(url, userInfo) {
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return data;
}
