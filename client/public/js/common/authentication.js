const username = sessionStorage.getItem("username");
const LoginButton = $("#LoginButton");
const LogoutButton = $("#LogoutButton");
const greetToUser = document.querySelector("#greetToUser");

function exposeLoginBtn() {
  sessionStorage.clear();
  LoginButton.removeClass("hidden");
  LogoutButton.addClass("hidden");
  greetToUser.classList.add("hidden");
}

function exposeLogoutBtn(username) {
  greetToUser.innerText = `안녕하세요! ${username}님`;
  LoginButton.addClass("hidden");
  LogoutButton.removeClass("hidden");
  greetToUser.classList.remove("hidden");
}

async function activateLogoutBtnClick() {
  LogoutButton.click(async () => {
    sessionStorage.clear();
    await fetchPostApiWithoutJSON(backendURL + "/auth/logout");
    LoginButton.removeClass("hidden");
    LogoutButton.addClass("hidden");
    greetToUser.classList.add("hidden");
    location.href = "/";
  });
}

async function assembleNavbar() {
  if (username) {
    const responseFromMeAPI = await authenticateTokenFromMeAPI();
    if (responseFromMeAPI.status === 401) {
      exposeLoginBtn();
    } else {
      const data = await responseFromMeAPI.json();
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
