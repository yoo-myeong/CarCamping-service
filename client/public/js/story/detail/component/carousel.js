export class StoryCarouselComponent {
  constructor(carousel) {
    this.carouselIndicators = carousel.indicators;
    this.carouselInner = carousel.inner;
  }

  create(storyImages) {
    storyImages.forEach((storyImage, i) => {
      const imgname = storyImage.imgname;
      const bottomButton = `
          <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="${i}"
          aria-current="true"
          aria-label="Slide ${i + 1}"
          >
          </button>`;
      const carouselImg =
        i == 0
          ? `<div class="carousel-item active">
                  <img src="/story/story_${storyId}/${imgname}" class="d-block w-100 h-100" />
                </div>`
          : `<div class="carousel-item">
                  <img src="/story/story_${storyId}/${imgname}" class="d-block w-100 h-100" />
                </div>`;
      if (i >= 1) {
        this.carouselIndicators.innerHTML += bottomButton;
      }
      this.carouselInner.innerHTML += carouselImg;
    });
  }
}
