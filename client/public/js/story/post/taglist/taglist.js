export class TagList {
  constructor(http, body) {
    this.http = http;
    this.body = body;
  }

  async createTagBox() {
    const tagnames = await this.getTags();
    tagnames.forEach((tagname, index) => {
      const Tagname = tagname.tagname;
      const tag = this.createTagsElements(Tagname, index);
      this.body.insertAdjacentElement("beforeend", tag);
    });
  }

  async getTags() {
    return this.http.fetch("/tag", { method: "GET" });
  }

  createTagsElements(tagname, index, checkState) {
    let checked = "";
    if (checkState) checked = checkState;
    const template = document.createElement("template");
    const element = `
    <div class="p-1" style="float:left">
      <input
        type="checkbox"
        class="btn-check"
        id="btncheck${index}"
        autocomplete="off"
        name="tags"
        value="${tagname}"
        ${checked}
      />
      <label class="btn btn-outline-success" for="btncheck${index}"
        >${tagname}</label
      >
    </div>
    `;
    template.innerHTML = element;
    return template.content.firstElementChild;
  }

  async create(storyTag) {
    const tagnames = await this.getTags();
    const storyTags = storyTag.map((data) => data.tag);
    tagnames.forEach((tagname, index) => {
      let checkState;
      const Tagname = tagname.tagname;
      storyTags.includes(Tagname) ? (checkState = "checked") : (checkState = "");
      const tag = this.createTagsElements(Tagname, index, checkState);
      this.body.insertAdjacentElement("beforeend", tag);
    });
  }
}
