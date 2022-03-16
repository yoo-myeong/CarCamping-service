import { createNewUserAccount, getToken } from "./auth_utils.js";

export async function testInvalidToken(request, url, method) {
  const token = undefined;

  const res = await request[method](url).set("Cookie", [`token=${token};`]);

  expect(res.statusCode).toBe(401);
  expect(res.body.msg).toBe("유효하지 않은 jwt");
}

export function getNewStories(allStory) {
  let stories = [];
  allStory.forEach((story) => {
    stories.push({ ...story });
  });
  return stories;
}

export async function creatingStory(request, story) {
  const user = await createNewUserAccount(request);
  const token = await getToken(request, user);

  const res = await request
    .post("/story")
    .set("Cookie", [`token=${token};`])
    .send(story);

  return res;
}
