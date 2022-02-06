export class StoryImageComponent {
  newImgCntLimit;
  constructor(body, id, hiddenForm) {
    this.body = body;
    this.storyId = id;
    this.hiddenUpdateForm = hiddenForm;
  }

  create(storyImages) {
    const buttonIds = [];
    storyImages.forEach((storyImage) => {
      const imgname = storyImage.imgname;
      const deleteImg = `
        <div id="${imgname}Div" class="border border-info rounded m-3">
          <img class="card-img-top" src="/story/story_${this.storyId}/${imgname}" class="d-block w-100" />
          <button id = "${imgname}_Button" type="button" class="btn-close" aria-label="Close">
          </button>
        <div>`;
      this.body.innerHTML += deleteImg;
      buttonIds.push(`${imgname}_Button`);
    });
    this.newImgCntLimit = 5 - storyImages.length;
    buttonIds.forEach((buttonId) => {
      $(`#${buttonId}`).click(() => {
        const imgname = buttonId.split("_")[0];
        this.hiddenUpdateForm.innerHTML += `<input class="hidden" name="deleteImgnames" value="${imgname}"/>`;
        this.newImgCntLimit++;
        $(`#${imgname}Div`).fadeOut();
      });
    });
  }
}
