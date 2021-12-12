const shop_board_tbody = document.querySelector("#shop_board_tbody");

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

async function getShop() {
  if (token) {
    const url = backendURL + "/shop";
    const response = await fetchGetApiWithToken(url, token);
    if (response.status !== 200) {
      res.status(400).json({ msg: "fetch from server failed" });
    } else {
      const responseJson = await response.json();
      responseJson.forEach((data) => {
        console.log(data);
        let { id, stuff, transaction, price, createdAt, user, shopImages } =
          data;
        if (!shopImages) shopImages[imgname] = "/img/noimg.png";
        const td_componenet = `
        <tr onclick="location.href = '/shop/detail/${id}'" style="cursor: pointer">
            <td class="product-img" style="width: 13%">
                <img
                class="d-block w-100"
                src="${shopImages[0].imgname}"
                />
            </td>
            <td class="deal-way">${transaction}</td>
            <td class="deal-way">${stuff}</td>
            <td class="price">${price}</td>
            <td class="createdAt">${alignTimeData(createdAt)}</td>
            <td class="seller">${user.name}</td>
        </tr>
        `;
        shop_board_tbody.innerHTML += td_componenet;
      });
    }
  } else {
    location.href = "/auth/login";
  }
}
