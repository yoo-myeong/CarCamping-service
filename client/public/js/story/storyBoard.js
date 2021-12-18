const cardBox = document.getElementById("cardBox");

async function getStory(query) {
  const queryString = !query
    ? ""
    : query === "heart"
    ? "/heart/stories"
    : "/?sort=" + query;

  if (username) {
    const url = backendURL + "/story" + queryString;
    const response = await fetchGetApiWithToken(url);
    cardBox.innerHTML = "";
    if (response.status !== 200) {
      console.error({ msg: "fetch error" });
    } else {
      const responseJson = await response.json();
      responseJson.forEach((data) => {
        let { title, address, id, createdAt, user, storyImages } = data;
        const thumbnail = storyImages[0].imgname;
        const name = user.name;
        const extraCode = `
        <div href="#">
            <div class="col">
                <a href="/story/detail/${id}">
                <div class="card">
                    <img
                        alt="/img/noimg.png"
                        src="/story/story_${id}/${thumbnail}"
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

async function getMyStory() {
  if (username) {
    cardBox.innerHTML = "";
    const url = backendURL + `/story?username=${username}`;
    const response = await fetchGetApiWithToken(url, username);
    if (response.status !== 200) {
      console.error({ msg: "fetch error" });
    } else {
      const responseJson = await response.json();
      responseJson.forEach((data) => {
        let { title, address, id, createdAt, user, storyImages } = data;
        const thumbnail = storyImages[0].imgname;
        const name = user.name;
        const extraCode = `
        <div href="#">
            <div class="col">
                <a href="/story/detail/${id}">
                <div class="card">
                    <img
                        alt="/img/noimg.png"
                        src="/story/story_${id}/${thumbnail}"
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

function sortStory(opt) {
  getStory(opt.value);
}

async function getSearchStory(search) {
  if (username) {
    const encodedSearch = encodeURI(search);
    const url = backendURL + "/story?search=" + encodedSearch;
    const response = await fetchGetApiWithToken(url);
    cardBox.innerHTML = "";
    if (response.status !== 200) {
      console.error({ msg: "fetch error" });
    } else {
      const responseJson = await response.json();
      responseJson.forEach((data) => {
        let { title, address, id, createdAt, user, storyImages } = data;
        const thumbnail = storyImages[0].imgname;
        const name = user.name;
        const extraCode = `
        <div href="#">
            <div class="col">
                <a href="/story/detail/${id}">
                <div class="card">
                    <img
                        alt="/img/noimg.png"
                        src="/story/story_${id}/${thumbnail}"
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
