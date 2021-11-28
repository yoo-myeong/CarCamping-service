import * as shopReplyData from "../../data/shop/shopReply.data.js";

export async function getAllShopReply(req, res, next) {
  const shopId = req.params.shopId;
  const replies = await shopReplyData.getAllReply(shopId);
  res.status(200).json(replies);
}

export async function createShopReply(req, res, next) {
  const json = {
    ...req.body,
    userId: req.userId,
  };
  const reply = await shopReplyData.createShopReply(json);
  if (reply) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(400);
  }
}
