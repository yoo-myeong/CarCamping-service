export class StroyHeart {
  story;
  constructor(http, whiteHeart, redHeart) {
    this.http = http;
    this.whiteHeartButton = whiteHeart.button;
    this.whiteHeartCnt = whiteHeart.count;
    this.redHeartButton = redHeart.button;
    this.redHeartCnt = redHeart.count;
    this.setOnButtonListener(this.whiteHeartButton, this.getWhiteBtnListener());
    this.setOnButtonListener(this.redHeartButton, this.getRedBtnListener());
  }

  setOnButtonListener(button, listener) {
    button.click(listener);
  }

  getWhiteBtnListener() {
    return async () => {
      try {
        const { heartCnt } = await this.http.fetch("/story/heart", {
          method: "POST",
          body: JSON.stringify({ storyId }),
        });
        this.updateHeartCnt(heartCnt);
        this.exposeRedHeart();
      } catch (error) {
        console.error(error);
      }
    };
  }

  getRedBtnListener() {
    return async () => {
      try {
        const { heartCnt } = await this.http.fetch("/story/heart/" + storyId, {
          method: "DELETE",
        });
        this.updateHeartCnt(heartCnt);
        this.exposeWhiteHeart();
      } catch (error) {
        console.error(error);
      }
    };
  }

  exposeWhiteHeart() {
    this.whiteHeartButton.removeClass("hidden");
    this.redHeartButton.addClass("hidden");
  }
  exposeRedHeart() {
    this.redHeartButton.removeClass("hidden");
    this.whiteHeartButton.addClass("hidden");
  }
  updateHeartCnt(heartCnt) {
    this.redHeartCnt.innerText = heartCnt;
    this.whiteHeartCnt.innerText = heartCnt;
  }

  async getHeartState(storyId) {
    try {
      const { heartCnt, IsHeartUser } = await this.http.fetch("/story/heart/" + storyId, { method: "GET" });
      IsHeartUser ? this.exposeRedHeart() : this.exposeWhiteHeart();
      this.updateHeartCnt(heartCnt);
    } catch (error) {
      console.error(error);
    }
  }
}
