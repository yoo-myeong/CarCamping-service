function selectById(id) {
  return document.querySelector(`#${id}`);
}

function inputIntoInnerText(text, element) {
  element.innerText += " " + text;
}
