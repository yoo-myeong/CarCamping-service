import * as shopData from "../../data/shop/shop.data.js";

export async function getShop(req, res, next) {
  try {
    const shops = await shopData.getAll();
    res.status(200).json(shops);
  } catch (e) {
    throw new Error(`모든 거래게시물 가져오기 실패\n${e}`);
  }
}

export async function createShop(req, res, next) {
  try {
    const shopId = await shopData.createShop(req.body, req.userId);
    res.status(201).json({ shopId });
  } catch (e) {
    throw new Error(`거래 게시물 생성 실패\n${e}`);
  }
}

export async function deleteShop(req, res, next) {
  const id = req.params.id;
  try {
    const shop = await shopData.getShopById(id);
    if (!shop) {
      return res.status(404).json({ message: `there's no shop that id is ${id}` });
    }
    if (req.userId !== shop.userId) {
      return res.sendStatus(403);
    }
    await shopData.deleteShop(id);
    res.sendStatus(204);
  } catch (e) {
    throw new Error(`거래 게시물 삭제 중 에러\n${e}`);
  }
}

export async function getShopById(req, res, next) {
  const id = req.params.id;
  try {
    const shop = await shopData.getShopById(id);
    res.status(200).json(shop);
  } catch (e) {
    throw new Error(`id 거래 게시물 가져오기 실패\n${e}`);
  }
}

export async function chekckAuthor(req, res, next) {
  let IsAuthor = false;
  try {
    const shop = await shopData.getShopById(req.params.id);
    if (shop.userId === req.userId) IsAuthor = true;
    if (shop.userId) {
      return res.status(200).json({ userId: req.userId, IsAuthor });
    } else {
      return res.status(403);
    }
  } catch (e) {
    throw new Error(`id 거래 게시물 가져오기 실패\n${e}`);
  }
}
