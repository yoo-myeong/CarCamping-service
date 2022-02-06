export class HttpClient {
  constructor() {
    this.baseURL = backendURL;
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
}
