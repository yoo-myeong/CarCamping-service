const loginButton = $("#loginButton");
const loginSpinner = $("#loginSpinner");
const inputAlert = () => alert("아이디와 비밀번호 모두 기입해주세요");
const unvalidAlert = () => alert("아이디 또는 비밀번호가 올바르지 않습니다.");

function activateLoginbtn() {
  loginButton.click(() => {
    const emailInput = $("#emailInput").val();
    const passwordInput = $("#passwordInput").val();
    if (!(emailInput && passwordInput)) {
      inputAlert();
    } else {
      loginSpinner.removeClass("hidden");
      getTokenFromLoginAPI(emailInput, passwordInput);
    }
  });
}

async function getTokenFromLoginAPI(email, password) {
  const body = { email, password };
  const url = backendURL + "/auth/login";
  const response = await fetchPostApiWithToken(url, body);
  const status = response.status;
  if (400 <= status && status < 500) {
    loginSpinner.addClass("hidden");
    unvalidAlert();
  } else if (status === 202) {
    loginSpinner.addClass("hidden");
    const { username } = await response.json();
    sessionStorage.setItem("username", username);
    location.href = "/";
  } else {
    location.href = "/error";
  }
}
