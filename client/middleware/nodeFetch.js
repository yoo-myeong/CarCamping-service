import fetch from "node-fetch";

export async function fetchPostApi(url, json) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  return response;
}

export async function fetchPostApiWithToken(url, json, token) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(json),
  });
  return response;
}
