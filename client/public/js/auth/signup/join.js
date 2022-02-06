import { HttpClient } from "../../network/fetch.js";
import { JoinFormComponent } from "./component/joinFormComponent.js";
import { JoinStateComponent } from "./component/joinStateComponent.js";

class Join {
  constructor(http, form, state) {
    this.http = http;
    this.form = form;
    this.state = state;
    const submitListener = this.getSubmitListener();
    this.form.setOnJoinSubmitListener(submitListener);
  }

  getSubmitListener() {
    return () => {
      const data = this.form.getSignupData();
      if (this.form.IsEmptyObject()) alert("전부 기입해주세요❗");
      else if (!this.form.email_check()) alert("이메일 형식이 아닙니다.");
      else if (data.password1 !== data.password2) alert("비밀번호를 동일하게 입력해주세요");
      else if (data.password1.length < 6) alert("비밀번호는 6자리 이상이어야 합니다.");
      else {
        this.state.exposeSpinner();
        this.signup(data.name, data.email, data.password1);
      }
    };
  }

  async signup(name, email, password) {
    const userData = { name, email, password };
    try {
      await this.http.fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      location.href = "/auth/login";
    } catch (error) {
      alert("가입되어 있는 이메일입니다.");
      this.state.hideSpinner();
    }
  }
}

const http = new HttpClient();
const email = $("#inputEmail");
const name = $("#inputName");
const password1 = $("#inputPassword1");
const password2 = $("#inputPassword2");
const spinner = $("#Spinner");
const joinSubmit = $("#join-submit");
const formComponent = new JoinFormComponent({ email, name, password1, password2 }, joinSubmit);
const stateComponent = new JoinStateComponent(spinner);
new Join(http, formComponent, stateComponent);
