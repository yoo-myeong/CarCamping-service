import fetch from "node-fetch";

export async function fetchGetApi(url) {
  fetch(url, {
    method: "GET",
  });
}

export async function fetchGetApiWithToken(url, token) {
  return fetch(url, {
    method: "GET",
    headers: {
      cookie: `token=${token}`,
    },
  });
}

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
      cookie: `token=${token}`,
    },
    body: JSON.stringify(json),
  });
  return response;
}

export async function fetchPutApiWithToken(url, json, token) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie: `token=${token}`,
    },
    body: JSON.stringify(json),
  });
  return response;
}
