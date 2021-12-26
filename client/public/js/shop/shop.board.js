const boardTbody = document.querySelector("#shop_board_tbody");

function alignTimeData(time) {
  return time.split("T")[0] + " " + time.split("T")[1].slice(0, 7);
}

async function getShop() {
  if (username) {
    const getShopURL = backendURL + "/shop";
    const responseFromGetShopAPI = await fetchGetApiWithToken(getShopURL);
    if (responseFromGetShopAPI.status !== 200) {
      res.status(400).json({ msg: "getting shop data failed" });
    } else {
      const responseParsed = await responseFromGetShopAPI.json();
      responseParsed.forEach((data) => {
        let {
          id,
          stuff,
          transaction,
          price,
          transtype,
          createdAt,
          user,
          shopImages,
        } = data;
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
            <td class="createdAt">${alignTimeData(createdAt)}</td>
            <td class="seller">${user.name}</td>
        </tr>
        `;
        boardTbody.innerHTML += tdComponent;
      });
    }
  } else {
    location.href = "/auth/login";
  }
}
