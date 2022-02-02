export class ShopContentComponent {
  constructor(selling, carousel) {
    this.selling = selling;
    this.carousel = carousel;
  }

  fillTextData(data) {
    const { stuff, createdAt, price, description, transaction, transtype, user } = data;
    this.selling.stuff.innerText += stuff;
    this.selling.price.innerText += price;
    this.selling.transaction.innerText += transaction;
    this.selling.transtype.innerText += transtype;
    this.selling.description.innerText += description;
    this.selling.author.innerText += user.name;
    this.selling.createdAt.innerText += this.alignTimeData(createdAt);
  }

  alignTimeData(time) {
    return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
  }

  getBottomBtnElement(index) {
    const bottomButton = `
      <button
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to="${index}"
      aria-current="true"
      aria-label="Slide ${index + 1}"
      >
      </button>`;
    return bottomButton;
  }

  getCarouselImgElement(index, imgname, shopId) {
    const carouselImg =
      index == 0
        ? `<div class="carousel-item active"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`;
    return carouselImg;
  }

  setOnImage(shopImages, id) {
    shopImages.forEach((shopImg, index) => {
      const imgname = shopImg.imgname;
      const bottomButton = this.getBottomBtnElement(index);
      const carouselImg = this.getCarouselImgElement(index, imgname, id);
      if (index >= 1) {
        this.carousel.carouselIndicators.innerHTML += bottomButton;
      }
      this.carousel.carouselInner.innerHTML += carouselImg;
    });
  }
}
