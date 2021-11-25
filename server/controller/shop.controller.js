import * as shopData from "../data/shop.data.js";

export async function getShop(req, res, next) {
  const shop = await shopData.getAll();
  res.status(200).json(shop);
}

export async function createShop(req, res, next) {
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
  const shop = await shopData.getShopByIdWithImg(id);
  res.status(200).json(shop);
}
