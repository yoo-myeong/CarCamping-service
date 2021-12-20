const username = sessionStorage.getItem("username");
const navLoginButton = $("#navLoginButton");
const navLogoutButton = $("#navLogoutButton");
const navUsername = document.querySelector("#navUsername");

function exposeLoginBtn() {
  sessionStorage.clear();
  navLoginButton.removeClass("hidden");
  navLogoutButton.addClass("hidden");
  navUsername.classList.add("hidden");
}

function exposeLogoutBtn(username) {
  navUsername.innerText = `안녕하세요! ${username}님`;
  navLoginButton.addClass("hidden");
  navLogoutButton.removeClass("hidden");
  navUsername.classList.remove("hidden");
}

async function activateLogoutBtnClick() {
  navLogoutButton.click(() => {
    sessionStorage.clear();
    fetchPostApiWithoutJSON(backendURL + "/auth/logout");
    navLoginButton.removeClass("hidden");
    navLogoutButton.addClass("hidden");
    navUsername.classList.add("hidden");
    location.href = "/";
  });
}

async function assembleNavbar() {
  if (username) {
    const response = await authenticateTokenFromMeAPI();
    if (response.status === 401) {
      exposeLoginBtn();
    } else {
      const data = await response.json();
      exposeLogoutBtn(data.username);
      activateLogoutBtnClick();
    }
  } else {
    exposeLoginBtn();
  }
}

async function redirectLoginForUnauthorization() {
  if (username) {
    const response = await authenticateTokenFromMeAPI();
    if (response.status === 401) {
      alert("로그인이 필요합니다.");
      location.href = "/auth/login";
    }
  } else {
    alert("로그인이 필요합니다.");
    location.href = "/auth/login";
  }
}
