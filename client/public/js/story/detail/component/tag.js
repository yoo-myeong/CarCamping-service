export class StoryTagComponent {
  constructor(body) {
    this.body = body;
  }

  create(storyTags) {
    storyTags.forEach((storyTag) => {
      const tag = storyTag.tag;
      this.body.innerHTML += `
      <button class="tagBtn btn btn-primary me-2" disabled>#${tag}
      </button>`;
    });
  }
}
