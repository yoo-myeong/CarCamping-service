const formButton = $("#form-button");
const buttonOuttaForm = $("#button-outta-form");

function postStoryValidation() {
  const essentialInput = $("#essentialInput");
  essentialInput.addClass("hidden");
  const formTitle = $("#form-title").val();
  const formAddress = $("#form-address").val();
  if (!(formTitle && formAddress)) {
    essentialInput.removeClass("hidden");
  } else {
    formButton.trigger("click");
  }
}

buttonOuttaForm.click(() => {
  postStoryValidation();
});
