export class StoryContentComponent {
  constructor(topName) {
    this.topName = topName;
  }

  create(content_data) {
    for (const key in content_data) {
      const element = document.querySelector(`#${this.topName}_${key}`);
      if (content_data[key]) {
        this.input(content_data[key], element);
      }
    }
  }

  input(text, element) {
    if (element instanceof HTMLSelectElement) {
      element.value = text;
    } else {
      element.value = text;
      element.innerText += " " + text;
    }
  }
}
