import * as shopData from "../../data/shop/shop.data.js";

export async function getShop(req, res, next) {
  const shop = await shopData.getAll();
  res.status(200).json(shop);
}

export async function createShop(req, res, next) {
  console.log(req.body);
  Object.keys(req.body).forEach(
    (x) => req.body[x] === "" && delete req.body[x]
  );
  const shopId = await shopData.createShop(req.body, req.userId);
  res.status(201).json({ shopId });
}

export async function deleteShop(req, res, next) {
  const id = req.params.id;
  const shop = await shopData.getShopById(id);
  if (!shop) {
    return res
      .status(404)
      .json({ message: `there's no shop that id is ${id}` });
  }
  if (req.userId !== shop.userId) {
    return res.sendStatus(403);
  }
  await shopData.deleteShop(id);
  res.sendStatus(204);
}

export async function getShopById(req, res, next) {
  const id = req.params.id;
  const shop = await shopData.getShopById(id);
  res.status(200).json(shop);
}

export async function chekckAuthor(req, res, next) {
  const shop = await shopData.getShopById(req.params.id);
  if (shop.userId === req.userId) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(403);
  }
}
