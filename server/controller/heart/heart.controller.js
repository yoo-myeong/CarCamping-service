import "express-async-errors";

export class HeartController {
  constructor(heartRepository) {
    this.hearts = heartRepository;
  }

  getHeart = async (req, res) => {
    const storyId = req.params.storyId;
    let IsHeartUser = false;
    try {
      const storyheart = await this.hearts.getByUserId(req.userId, storyId);
      if (storyheart) IsHeartUser = true;
      const heartCnt = await this.hearts.getCount(storyId);
      return res.status(200).json({ heartCnt, IsHeartUser });
    } catch (e) {
      throw new Error(`스토리 하트 가져오기 실패\n${e}`);
    }
  };

  getStoryOrderedByHeart = async (req, res) => {
    try {
      const story = await this.hearts.getStoryByHeart();
      return res.status(200).json(story);
    } catch (e) {
      throw new Error(`하트순 정렬 된 스토리 가져오기 실패\n${e}`);
    }
  };

  createHeart = async (req, res, next) => {
    const storyId = req.body.storyId;
    try {
      await this.hearts.createHeart(req.userId, storyId);
      const heartCnt = await this.hearts.getCount(storyId);
      return res.status(201).json({ heartCnt });
    } catch (e) {
      throw new Error(`하트 생성 실패\n${e}`);
    }
  };

  deleteHeart = async (req, res, next) => {
    const storyId = req.params.storyId;
    try {
      await this.hearts.deleteHeart(req.userId, storyId);
      const heartCnt = await this.hearts.getCount(storyId);
      return res.status(200).json({ heartCnt });
    } catch (e) {
      throw new Error(`하트 삭제 실패\n${e}`);
    }
  };
}
