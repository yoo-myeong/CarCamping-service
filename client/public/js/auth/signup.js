const diffrentPasswordAlert = $("#diffrentPasswordAlert");
const shortPasswordAlert = $("#shortPasswordAlert");
const inputAlert = $("#inputAlert");
const invalidEmailAlert = $("#invalidEmailAlert");
const notEmailAlert = $("#notEmailAlert");

function validateJoinSubmit() {
  $("#join-submit").click(() => {
    invalidEmailAlert.addClass("hidden");
    shortPasswordAlert.addClass("hidden");
    diffrentPasswordAlert.addClass("hidden");
    notEmailAlert.addClass("hidden");
    inputAlert.addClass("hidden");
    const inputEmail = $("#inputEmail")[0].value;
    const inputName = $("#inputName")[0].value;
    const inputPassword1 = $("#inputPassword1")[0].value;
    const inputPassword2 = $("#inputPassword2")[0].value;

    if (inputEmail && inputName && inputPassword1 && inputPassword2) {
      if (!email_check(inputEmail)) {
        notEmailAlert.removeClass("hidden");
      } else {
        if (inputPassword1 !== inputPassword2) {
          diffrentPasswordAlert.removeClass("hidden");
        } else if (inputPassword1 === inputPassword2) {
          if (inputPassword1.length < 6)
            shortPasswordAlert.removeClass("hidden");
          else {
            signup(inputName, inputEmail, inputPassword1);
          }
        }
      }
    } else {
      inputAlert.removeClass("hidden");
    }
  });
}

async function signup(name, email, password) {
  const url = backendURL + "/auth/signup";
  const response = await fetchPostApiWithToken(url, {
    name,
    email,
    password,
  });
  const status = response.status;
  if (status === 409) {
    invalidEmailAlert.removeClass("hidden");
  } else if (status === 400) {
    notEmailAlert.removeClass("hidden");
  } else if (status === 201) {
    location.href = "/auth/login";
  } else {
    location.href = "/error";
  }
}

function email_check(email) {
  var regex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email != "" && email != "undefined" && regex.test(email);
}
