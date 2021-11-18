const loginButton = $("#loginButton");
const inputAlert = $("#inputAlert");
const unvalidAlert = $("#unvalidAlert");

function clickLoginbtn() {
  loginButton.click(() => {
    unvalidAlert.addClass("hidden");
    const inputEmail = $("#inputEmail")[0].value;
    const inputPassword = $("#inputPassword")[0].value;
    if (!(inputEmail && inputPassword)) {
      inputAlert.removeClass("hidden");
    } else {
      getTokenFromMeAPI(inputEmail, inputPassword);
    }
  });
}

async function getTokenFromMeAPI(email, password) {
  const body = { email, password };
  const url = backendURL + "/auth/login";
  const response = await fetchPostApi(url, body);
  const status = response.status;
  if (400 <= status < 500) {
    unvalidAlert.removeClass("hidden");
  } else {
    const { name, token } = await response.json();
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("name", name);
    location.href = "/";
  }
}
