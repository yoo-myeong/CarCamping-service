import { HttpClient } from "../common/fetch.js";

class Login {
  constructor(http, formComponent, stateComponent) {
    this.http = http;
    this.formComponent = formComponent;
    this.stateComponent = stateComponent;
    const loginListener = this.getLoginListener();
    this.formComponent.setOnLoginListener(loginListener);
  }

  getLoginListener() {
    return async () => {
      const { email, password } = this.formComponent.getUserData();
      if (!(email && password)) {
        alert("아이디와 비밀번호 모두 기입해주세요");
        return;
      }
      this.stateComponent.exposeSpinner();
      try {
        const { username } = await this.LoginRequest(email, password);
        this.handleSuccess(username);
      } catch {
        this.handleFail();
      }
    };
  }

  LoginRequest(email, password) {
    return this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  handleSuccess(username) {
    this.stateComponent.hideSpinner();
    sessionStorage.setItem("username", username);
    location.href = "/";
  }

  handleFail() {
    this.stateComponent.hideSpinner();
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  }
}

class LoginFormComponent {
  constructor(loginButton) {
    this.loginButton = loginButton;
  }

  getUserData() {
    const email = $("#emailInput").val();
    const password = $("#passwordInput").val();
    return {
      email,
      password,
    };
  }

  setOnLoginListener(listener) {
    this.loginButton.click(listener);
  }
}

class LoginStateComponent {
  constructor(sppiner) {
    this.sppiner = sppiner;
  }

  exposeSpinner() {
    this.sppiner.removeClass("hidden");
  }
  hideSpinner() {
    this.sppiner.addClass("hidden");
  }
}

const loginButton = $("#loginButton");
const sppiner = $("#loginSpinner");

const http = new HttpClient();
const formComponent = new LoginFormComponent(loginButton);
const stateComponent = new LoginStateComponent(sppiner);
new Login(http, formComponent, stateComponent);
