const cardBox = document.getElementById("cardBox");

async function getStory() {
  if (token) {
    const url = backendURL + "/story";
    const response = await fetchGetApiWithToken(url, token);
    if (response.status !== 200) {
      location.href = "/error";
    } else {
      const responseJson = await response.json();
      responseJson.forEach((data) => {
        console.log(data);
        let { thumbnail, title, address, storyId, createdAt, name } = data;
        if (!thumbnail) thumbnail = "/img/noimg.png";
        const extraCode = `
        <div href="#">
            <div class="col">
                <a href="story/detail/${storyId}">
                <div class="card">
                    <img
                        src="${thumbnail}"
                        class="card-img-top"
                    />
                    <div class="card-body">
                        <h5 class="card-title">제목 : ${title}</h5>
                        <p class="author">작성자 : ${name}</p>
                        <p class="place">주소 : ${address}</p>
                        <p class="date">작성일 : ${createdAt.split("T")[0]}</p>
                    </div>
                </div>
                </a>
            </div>
        </div>
        `;
        cardBox.innerHTML += extraCode;
      });
    }
  } else {
    location.href = "/auth/login";
  }
}
