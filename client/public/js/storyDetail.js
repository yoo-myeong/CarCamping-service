const carouselIndicators = selectById("carousel-indicators");
const carouselInner = selectById("carousel-inner");

async function makeDetailStory(storyId) {
  const url = backendURL + "/story/" + storyId;
  const response = await fetchGetApiWithToken(url, token);
  const { imgnames, story } = await response.json();
  console.log(story);
  let i = 0;
  const name = story.user.name;
  inputIntoInnerText(name, selectById("detail_name"));
  story.createdAt =
    story.createdAt.split("T")[0] +
    " " +
    story.createdAt.split("T")[1].slice(0, 7);
  delete story.user;
  for (const key in story) {
    const element = selectById(`detail_${key}`);
    if (story[key]) {
      inputIntoInnerText(story[key], element);
    } else {
      inputIntoInnerText("없음", element);
    }
  }
  imgnames.forEach((imgname) => {
    console.log(imgname);
    const bottomButton = `<button
type="button"
data-bs-target="#carouselExampleIndicators"
data-bs-slide-to="${i}"
aria-current="true"
aria-label="Slide ${i + 1}"
></button>`;
    const carouselImg =
      i == 0
        ? `<div class="carousel-item active"><img src="/${imgname}" class="d-block w-100" /></div>`
        : `<div class="carousel-item"><img src="/${imgname}" class="d-block w-100" /></div>`;
    if (i >= 1) {
      carouselIndicators.innerHTML += bottomButton;
    }
    carouselInner.innerHTML += carouselImg;
    i++;
  });
}
