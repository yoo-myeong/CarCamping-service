export class StoryArcodianComponent {
  constructor(body) {
    this.body = body;
  }
  create(paid_campsite_info) {
    for (const key in paid_campsite_info) {
      if (paid_campsite_info[key]) {
        this.body.innerHTML += `<div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  ${key}
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  ${paid_campsite_info[key]}
                </div>
              </div>
          </div>`;
      }
    }
  }
}
