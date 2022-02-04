import * as shopMobileData from "../../data/shop/shop.mobile.data.js";
import * as ShopData from "../../data/shop/shop.data.js";

export async function getMobileAccessById(req, res, next) {
  const id = req.params.id;
  try {
    const accesses = await shopMobileData.getMobileAccessById(id);
    return res.status(200).json(accesses);
  } catch (e) {
    throw new Error(`id의 연락처 접근 권한 가져오기 실패\n${e}`);
  }
}

export async function createMobileAccess(req, res, next) {
  const id = req.params.id;
  try {
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
  } catch (e) {
    throw new Error(`연락처 접근 권하 추가 실패\n${e}`);
  }
}
