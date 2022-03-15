import faker from "faker";

export function makeValidUserDetails() {
  const fakeUser = faker.helpers.userCard();
  return {
    name: fakeUser.name,
    email: fakeUser.email,
    password: faker.internet.password(10, true),
  };
}

export async function createNewUserAccount(request) {
  const userDetails = makeValidUserDetails();
  await request.post("/auth/signup").send(userDetails);
  return userDetails;
}

export async function getToken(request, user) {
  const { email, password } = user;
  const res = await request.post("/auth/login").send({ email, password });
  return res.body.token;
}
