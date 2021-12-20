function selectById(id) {
  return document.querySelector(`#${id}`);
}

function inputIntoInnerText(text, element) {
  element.innerText += " " + text;
}

function searchPlace() {
  const address = $("#searchInput").val();
  location.href = "/story/search/" + address;
}
