async function fetchPostApiWithoutJSON(url) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });
  return response;
}

async function authenticateTokenFromMeAPI() {
  const response = await fetch(backendURL + "/auth/me", {
    method: "GET",
    credentials: "include",
  });
  return response;
}

async function fetchGetApiWithToken(url) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  return response;
}

async function fetchPostApiWithToken(url, json) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
    credentials: "include",
  });
  return response;
}

async function fetchDeleteApiWithToken(url) {
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  return response;
}
