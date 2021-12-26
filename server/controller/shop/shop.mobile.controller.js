import * as shopMobileData from "../../data/shop/shop.mobile.data.js";
import * as ShopData from "../../data/shop/shop.data.js";

export async function getMobileAccessById(req, res, next) {
  const id = req.params.id;
  const accesses = await shopMobileData.getMobileAccessById(id);
  return res.status(200).json(accesses);
}

export async function createMobileAccess(req, res, next) {
  const id = req.params.id;
  const shop = await ShopData.getShopById(id);
  if (req.userId !== shop.userId) {
    return res.status(403).json({
      message: `not available create accessableUser`,
    });
  } else {
    const userId = req.body.userId;
    shopMobileData.createMobileAccess(id, userId);
    return res.sendStatus(201);
  }
}
