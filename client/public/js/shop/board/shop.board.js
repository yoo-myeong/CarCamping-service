import { HttpClient } from "../../network/fetch.js";

class shopBoard {
  constructor(http, tbody) {
    this.http = http;
    this.tbody = tbody;
  }

  getShop() {
    return this.http.fetch("/shop", { method: "GET" });
  }

  fillInTable(shops) {
    shops.forEach((shop) => {
      let { id, stuff, transaction, price, transtype, createdAt, user, shopImages } = shop;
      const tdComponent = `
        <tr onclick="location.href = '/shop/detail/${id}'" style="cursor: pointer">
            <td class="product-img" style="width: 13%">
                <img
                class="d-block w-100"
                src="/shop/shop_${id}/${shopImages[0].imgname}"
                />
            </td>
            <td class="stuff">${stuff}</td>
            <td class="transtype">${transtype}</td>
            <td class="deal-way">${transaction}</td>
            <td class="price">${price}</td>
            <td class="createdAt">${this.alignTimeData(createdAt)}</td>
            <td class="seller">${user.name}</td>
        </tr>
        `;
      this.tbody.innerHTML += tdComponent;
    });
  }

  alignTimeData(time) {
    return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
  }
}

const tbody = document.querySelector("#shop_board_tbody");
const http = new HttpClient();
const board = new shopBoard(http, tbody);
board
  .getShop()
  .then((shops) => {
    board.fillInTable(shops);
  })
  .catch((error) => {
    console.error(error);
  });
