import * as shopReplyData from "../../data/shop/shop.reply.data.js";

export async function getAllShopReply(req, res, next) {
  const id = req.params.id;
  const replies = await shopReplyData.getAllReply(id);
  res.status(200).json(replies);
}

export async function createShopReply(req, res, next) {
  const reply = {
    ...req.body,
    userId: req.userId,
  };
  const createResult = await shopReplyData.createShopReply(reply);
  if (createResult) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(400);
  }
}
