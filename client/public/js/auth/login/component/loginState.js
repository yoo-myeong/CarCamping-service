export class LoginStateComponent {
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
