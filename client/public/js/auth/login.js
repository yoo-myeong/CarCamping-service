const loginButton = $("#loginButton");
const inputAlert = $("#inputAlert");
const unvalidAlert = $("#unvalidAlert");
const loginSpinner = $("#loginSpinner");

function clickLoginbtn() {
  loginButton.click(() => {
    unvalidAlert.addClass("hidden");
    inputAlert.addClass("hidden");
    const inputEmail = $("#inputEmail")[0].value;
    const inputPassword = $("#inputPassword")[0].value;
    if (!(inputEmail && inputPassword)) {
      inputAlert.removeClass("hidden");
    } else {
      loginSpinner.removeClass("hidden");
      getTokenFromLoginAPI(inputEmail, inputPassword);
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
    unvalidAlert.removeClass("hidden");
  } else if (status === 202) {
    loginSpinner.addClass("hidden");
    const { username } = await response.json();
    sessionStorage.setItem("username", username);
    location.href = "/";
  } else {
    location.href = "/error";
  }
}
