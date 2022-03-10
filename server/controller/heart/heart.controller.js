import "express-async-errors";

export class HeartController {
  constructor(heartRepository) {
    this.hearts = heartRepository;
  }

  getHeart = async (req, res, next) => {
    const storyId = req.params.storyId;
    let IsHeartUser = false;
    try {
      const storyheart = await this.hearts.getHeartByUserId(req.userId, storyId);
      if (storyheart) IsHeartUser = true;
    } catch (e) {
      throw new Error(`id의 스토리 하트 가져오기 실패\n${e}`);
    }
    try {
      const heartCnt = await this.hearts.getHeartCnt(storyId);
      return res.status(200).json({ heartCnt, IsHeartUser });
    } catch (e) {
      throw new Error(`스토리 하트 개수 가져오기 실패\n${e}`);
    }
  };

  getStoryOrderedByHeart = async (req, res, next) => {
    try {
      const story = await this.hearts.getStoryOrderedByHeart();
      return res.status(200).json(story);
    } catch (e) {
      throw new Error(`하트순 정렬 된 스토리 가져오기 실패\n${e}`);
    }
  };

  createHeart = async (req, res, next) => {
    const storyId = req.body.storyId;
    try {
      const stroyheart = await this.hearts.createHeart(req.userId, storyId);
      const heartCnt = await this.hearts.getHeartCnt(storyId);
      if (stroyheart) {
        return res.status(201).json({ heartCnt });
      }
      return res.status(400).json({ heartCnt });
    } catch (e) {
      throw new Error(`하트 생성 실패\n${e}`);
    }
  };

  deleteHeart = async (req, res, next) => {
    const storyId = req.params.storyId;
    try {
      const heartCnt = await this.hearts.deleteHeart(req.userId, storyId);
      return res.status(200).json({ heartCnt });
    } catch (e) {
      throw new Error(`하트 삭제 실패\n${e}`);
    }
  };
}
