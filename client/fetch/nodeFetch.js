import fetch from "node-fetch";
import { config } from "../config.js";

export class HttpClient {
  constructor() {
    this.baseURL = config.backendURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message = data && data.message ? data.message : "에러발생!";
      const error = new Error(message);
      throw error;
    }
    return data;
  }

  async authenticate(token) {
    try {
      await this.fetch("/auth/me", {
        method: "GET",
        headers: {
          cookie: `token=${token}`,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

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
