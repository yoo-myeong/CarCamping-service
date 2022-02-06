export class ShopReplyComponent {
  constructor(commentComponent) {
    this.commentContainer = commentComponent.container;
    this.commentCounter = commentComponent.counter;
  }

  addToCommentContainer(commentCard) {
    this.commentContainer.insertAdjacentElement("beforeend", commentCard);
  }

  getCommentCard(reply) {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="card my-1" id="reply_card">
        <div class="card-header d-flex justify-content-between">
          <div><p>이름 : ${reply.user.name}</p></div>
          <div class="card-header-body">
            <span class="text-end">작성일 : ${reply.createdAt}</span>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">${reply.content}</p>
        </div>
    </div>
    `;
    const comment = template.content.firstElementChild;
    return comment;
  }

  getAccessButton() {
    const template = document.createElement("template");
    template.innerHTML = `
        <button type="button" class="btn btn-secondary btn-sm ms-3">
          연락처공유
        </button>`;
    const accessBtn = template.content.firstElementChild;
    return accessBtn;
  }

  createComment(reply, IsAuthor, AccessableUserIds) {
    const card = this.getCommentCard(reply);
    if (IsAuthor) {
      const cardHeader = card.querySelector(".card-header-body");
      const button = this.getAccessButton();
      AccessableUserIds.includes(reply.userId)
        ? button.setAttribute("disabled", "")
        : button.setAttribute("onclick", `createAccessableUser(${reply.userId})`);
      cardHeader.insertAdjacentElement("beforeend", button);
    }
    this.addToCommentContainer(card);
  }
}
