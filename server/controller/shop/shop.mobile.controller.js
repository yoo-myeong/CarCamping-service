import * as shopMobileData from "../../data/shop/shop.mobile.data.js";
import * as ShopData from "../../data/shop/shop.data.js";

export async function getMobileAccessById(req, res, next) {
  const shopId = req.params.shopId;
  const accesses = await shopMobileData.getMobileAccessById(shopId);
  return res.status(200).json(accesses);
}

export async function createMobileAccess(req, res, next) {
  const shopId = req.params.shopId;
  const shop = await ShopData.getShopById(shopId);
  if (req.userId !== shop.userId) {
    return res.status(403).json({
      message: "your userId is not allowed",
    });
  } else {
    const accessUserId = req.body.userId;
    shopMobileData.createMobileAccess(shopId, accessUserId);
    return res.sendStatus(201);
  }
}
