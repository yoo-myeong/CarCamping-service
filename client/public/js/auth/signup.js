import { HttpClient } from "../common/fetch.js";

const diffrentPasswordAlert = () => alert("비밀번호를 동일하게 입력해주세요");
const shortPasswordAlert = () => alert("비밀번호는 6자리 이상이어야 합니다.");
const inputAlert = () => alert("전부 기입해주세요❗");
const invalidEmailAlert = () => alert("가입되어 있는 이메일입니다.");
const notEmailAlert = () => alert("이메일 형식이 아닙니다.");

class Join {
  constructor(http) {
    this.http = http;
    $("#join-submit").click(() => {
      const inputEmail = $("#inputEmail").val();
      const inputName = $("#inputName").val();
      const inputPassword1 = $("#inputPassword1").val();
      const inputPassword2 = $("#inputPassword2").val();

      if (!(inputEmail && inputName && inputPassword1 && inputPassword2)) inputAlert();
      else if (!this.email_check(inputEmail)) notEmailAlert();
      else if (inputPassword1 !== inputPassword2) diffrentPasswordAlert();
      else if (inputPassword1.length < 6) shortPasswordAlert();
      else {
        $("#Spinner").removeClass("hidden");
        this.signup(inputName, inputEmail, inputPassword1);
      }
    });
  }

  email_check(email) {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
  }

  async signup(name, email, password) {
    const userData = { name, email, password };
    const response = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const status = response.status;
    if (status === 409) invalidEmailAlert();
    else if (status === 201) location.href = "/auth/login";
    else alert("회원가입에 실패했습니다.");
  }
}

const http = new HttpClient();
new Join(http);
