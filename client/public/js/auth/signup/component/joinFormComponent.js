export class JoinFormComponent {
  constructor(elements, submit) {
    this.emailInput = elements.email;
    this.nameInput = elements.name;
    this.password1Input = elements.password1;
    this.password2Input = elements.password2;
    this.submit = submit;
  }

  getSignupData() {
    const email = this.emailInput.val();
    const name = this.nameInput.val();
    const password1 = this.password1Input.val();
    const password2 = this.password2Input.val();
    return { email, name, password1, password2 };
  }

  email_check() {
    const email = this.emailInput.val();
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
  }

  IsEmptyObject() {
    const object = this.getSignupData();
    let result = false;
    for (const key in object) {
      if (!object[key]) {
        result = true;
        break;
      }
    }
    return result;
  }

  setOnJoinSubmitListener(listener) {
    this.submit.click(listener);
  }
}
