import { HttpClient } from "../network/fetch.js";
import { navbarAuthComponent } from "./component/navbar.js";

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

const http = new HttpClient();
const LoginButton = $("#LoginButton");
const LogoutButton = $("#LogoutButton");
const greetToUser = $("#greetToUser");
const navbarAuth = new navbarAuthComponent(LoginButton, LogoutButton, greetToUser);
new Navigator(http, navbarAuth);
