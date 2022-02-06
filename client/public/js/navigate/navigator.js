import { HttpClient } from "../network/fetch.js";
import { navbarAuthComponent } from "./component/navbar.js";

class Navigator {
  constructor(httpclient, navbarAuth) {
    this.http = httpclient;
    this.navbarAuth = navbarAuth;
    this.setAuthButton();
  }

  async setAuthButton() {
    try {
      const { username } = await this.requestAuth();
      this.navbarAuth.exposeLogoutBtn(username);
    } catch {
      this.navbarAuth.exposeLoginBtn();
    }
  }

  requestAuth() {
    return this.http.fetch("/auth/me", { method: "GET" });
  }
}

const http = new HttpClient();
const LoginButton = $("#LoginButton");
const LogoutButton = $("#LogoutButton");
const greetToUser = $("#greetToUser");
const navbarAuth = new navbarAuthComponent(LoginButton, LogoutButton, greetToUser);
navbarAuth.setLogoutListener(async () => {
  await http.fetch("/auth/logout", { method: "POST" });
  navbarAuth.exposeLoginBtn();
  location.href = "/";
});
new Navigator(http, navbarAuth);
