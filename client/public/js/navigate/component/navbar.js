export class navbarAuthComponent {
  constructor(loginBtn, logoutBtn, greetToUser) {
    this.loginBtn = loginBtn;
    this.logoutBtn = logoutBtn;
    this.greetToUser = greetToUser;
  }

  setLogoutListener(listener) {
    this.logoutBtn.click(listener);
  }

  exposeLoginBtn() {
    sessionStorage.clear();
    this.loginBtn.removeClass("hidden");
    this.logoutBtn.addClass("hidden");
    this.greetToUser.addClass("hidden");
  }

  exposeLogoutBtn(username) {
    this.loginBtn.addClass("hidden");
    this.logoutBtn.removeClass("hidden");
    this.greetToUser.removeClass("hidden");
    this.greetToUser.text(`안녕하세요! ${username}님`);
  }
}
