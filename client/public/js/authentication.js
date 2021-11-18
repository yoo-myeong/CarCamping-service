const token = sessionStorage.getItem("token");
const navLoginButton = $("#navLoginButton");
const navLogoutButton = $("#navLogoutButton");
const navUsername = document.querySelector("#navUsername");

function exposeLoginBtn() {
  sessionStorage.clear();
  navLoginButton.removeClass("hidden");
  navLogoutButton.addClass("hidden");
  navUsername.addClass("hidden");
}

function exposeLogoutBtn(data) {
  navUsername.innerText = `안녕하세요! ${data.name}님`;
  navLoginButton.addClass("hidden");
  navLogoutButton.removeClass("hidden");
  navUsername.classList.remove("hidden");
}

async function tokenAuthentication() {
  if (token) {
    const response = await fetch("http://localhost:8080/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      exposeLoginBtn();
    } else {
      const data = await response.json();
      exposeLogoutBtn(data);
    }
  }
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
