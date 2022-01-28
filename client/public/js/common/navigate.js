export class Navigator {
  username = sessionStorage.getItem("username");
  constructor(httpclient, navbarAuth) {
    this.http = httpclient;
    this.navbarAuth = navbarAuth;
    const logoutListener = this.getLogoutListener();
    this.navbarAuth.setLogoutListener(logoutListener);
    this.checkAuthState();
  }

  async checkAuthState() {
    if (!this.username) {
      this.navbarAuth.exposeLoginBtn();
      return;
    }
    try {
      const { username } = await this.http.fetch("/auth/me", { method: "GET" });
      this.navbarAuth.exposeLogoutBtn(username);
    } catch {
      this.navbarAuth.exposeLoginBtn();
    }
  }

  getLogoutListener() {
    return async () => {
      await this.http.fetch("/auth/logout", { method: "POST" });
      this.navbarAuth.exposeLoginBtn();
      location.href = "/";
    };
  }
}

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
