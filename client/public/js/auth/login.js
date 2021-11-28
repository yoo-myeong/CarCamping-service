const loginButton = $("#loginButton");
const inputAlert = $("#inputAlert");
const unvalidAlert = $("#unvalidAlert");

function clickLoginbtn() {
  loginButton.click(() => {
    unvalidAlert.addClass("hidden");
    inputAlert.addClass("hidden");
    const inputEmail = $("#inputEmail")[0].value;
    const inputPassword = $("#inputPassword")[0].value;
    if (!(inputEmail && inputPassword)) {
      inputAlert.removeClass("hidden");
    } else {
      getTokenFromLoginAPI(inputEmail, inputPassword);
    }
  });
}

async function getTokenFromLoginAPI(email, password) {
  const body = { email, password };
  const url = backendURL + "/auth/login";
  const response = await fetchPostApi(url, body);
  const status = response.status;
  if (400 <= status && status < 500) {
    unvalidAlert.removeClass("hidden");
  } else if (status === 202) {
    const { name, token } = await response.json();
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("name", name);
    location.href = "/";
  } else {
    location.href = "/error";
  }
}
