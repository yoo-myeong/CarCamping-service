export class JoinStateComponent {
  constructor(spinner) {
    this.spinner = spinner;
  }

  exposeSpinner() {
    this.spinner.removeClass("hidden");
  }

  hideSpinner() {
    this.spinner.addClass("hidden");
  }
}
