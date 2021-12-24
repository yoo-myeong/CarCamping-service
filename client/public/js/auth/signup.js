const diffrentPasswordAlert = () => alert("비밀번호를 동일하게 입력해주세요");
const shortPasswordAlert = () => alert("비밀번호는 6자리 이상이어야 합니다.");
const inputAlert = () => alert("전부 기입해주세요❗");
const invalidEmailAlert = () => alert("가입되어 있는 이메일입니다.");
const notEmailAlert = () => alert("이메일 형식이 아닙니다.");

function email_check(email) {
  var regex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return email != "" && email != "undefined" && regex.test(email);
}

function validateJoinSubmit() {
  $("#join-submit").click(() => {
    const inputEmail = $("#inputEmail")[0].value;
    const inputName = $("#inputName")[0].value;
    const inputPassword1 = $("#inputPassword1")[0].value;
    const inputPassword2 = $("#inputPassword2")[0].value;

    if (inputEmail && inputName && inputPassword1 && inputPassword2) {
      if (!email_check(inputEmail)) {
        notEmailAlert();
      } else {
        if (inputPassword1 !== inputPassword2) {
          diffrentPasswordAlert();
        } else if (inputPassword1 === inputPassword2) {
          if (inputPassword1.length < 6) shortPasswordAlert();
          else {
            $("#Spinner").removeClass("hidden");
            signup(inputName, inputEmail, inputPassword1);
          }
        }
      }
    } else {
      inputAlert();
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
    invalidEmailAlert();
  } else if (status === 201) {
    location.href = "/auth/login";
  } else {
    location.href = "/error";
  }
}
