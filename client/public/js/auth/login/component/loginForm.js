export class LoginFormComponent {
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
