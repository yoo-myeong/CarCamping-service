const token = sessionStorage.getItem("token");
const navLoginButton = $("#navLoginButton");
const navLogoutButton = $("#navLogoutButton");
const navUsername = document.querySelector("#navUsername");

function exposeLoginBtn() {
  sessionStorage.clear();
  navLoginButton.removeClass("hidden");
  navLogoutButton.addClass("hidden");
  navUsername.classList.add("hidden");
}

function exposeLogoutBtn(data) {
  navUsername.innerText = `안녕하세요! ${data.name}님`;
  navLoginButton.addClass("hidden");
  navLogoutButton.removeClass("hidden");
  navUsername.classList.remove("hidden");
}

function clickNavLogoutButton() {
  navLogoutButton.click(() => {
    sessionStorage.clear();
    navLoginButton.removeClass("hidden");
    navLogoutButton.addClass("hidden");
    navUsername.classList.add("hidden");
    location.href = "/";
  });
}

async function modifyNavbar() {
  if (token) {
    const response = await authenticateTokenFromMeAPI(token);
    if (response.status === 401) {
      exposeLoginBtn();
    } else {
      const data = await response.json();
      exposeLogoutBtn(data);
      clickNavLogoutButton();
    }
  } else {
    exposeLoginBtn();
  }
}

function setTokenintoInput() {
  const inputToken = document.getElementById("inputToken");
  const token = sessionStorage.getItem("token");
  inputToken.value = token;
}

async function redirectLoginForUnauthorization() {
  if (token) {
    const response = await authenticateTokenFromMeAPI(token);
    if (response.status === 401) {
      alert("로그인이 필요합니다.");
      location.href = "/auth/login";
    }
  } else {
    alert("로그인이 필요합니다.");
    location.href = "/auth/login";
  }
}
