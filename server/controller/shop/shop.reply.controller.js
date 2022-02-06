import * as shopReplyData from "../../data/shop/shop.reply.data.js";

export async function getAllShopReply(req, res, next) {
  const id = req.params.id;
  try {
    const replies = await shopReplyData.getAllReply(id);
    return res.status(200).json(replies);
  } catch (e) {
    throw new Error(`댓글 가져오기 실패\n${e}`);
  }
}

export async function createShopReply(req, res, next) {
  const reply = {
    ...req.body,
    userId: req.userId,
  };
  try {
    const createResult = await shopReplyData.createShopReply(reply);
    return res.sendStatus(201);
  } catch (e) {
    throw new Error(`댓글 생성 실패\n${e}`);
  }
}
