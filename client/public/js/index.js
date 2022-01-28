import { navbarAuthComponent, Navigator } from "./common/navigate.js";
import { HttpClient } from "./common/fetch.js";

const http = new HttpClient();
const LoginButton = $("#LoginButton");
const LogoutButton = $("#LogoutButton");
const greetToUser = $("#greetToUser");
const navbarAuth = new navbarAuthComponent(LoginButton, LogoutButton, greetToUser);
new Navigator(http, navbarAuth);
