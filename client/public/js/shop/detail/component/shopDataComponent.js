export class ShopDataComponent {
  constructor(selling, carousel) {
    this.selling = selling;
    this.carousel = carousel;
  }

  fillShopData(data) {
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

  getBottomBtnElement(i) {
    const bottomButton = `
      <button
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to="${i}"
      aria-current="true"
      aria-label="Slide ${i + 1}"
      >
      </button>`;
    return bottomButton;
  }

  getCarouselImgElement(i, imgname, shopId) {
    const carouselImg =
      i == 0
        ? `<div class="carousel-item active"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/shop/shop_${shopId}/${imgname}" class="d-block w-100" /></div>`;
    return carouselImg;
  }

  setCarousel(shopImages, id) {
    shopImages.forEach((shopImg, i) => {
      const imgname = shopImg.imgname;
      const bottomButton = this.getBottomBtnElement(i);
      const carouselImg = this.getCarouselImgElement(i, imgname, id);
      if (i >= 1) {
        this.carousel.carouselIndicators.innerHTML += bottomButton;
      }
      this.carousel.carouselInner.innerHTML += carouselImg;
    });
  }
}
