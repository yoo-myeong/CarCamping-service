import faker from "faker";

export function makeValidUserDetails() {
  const fakeUser = faker.helpers.userCard();
  return {
    name: fakeUser.name,
    email: fakeUser.email,
    password: faker.internet.password(10, true),
  };
}

export async function createNewUserAccount(request, server) {
  const userDetails = makeValidUserDetails();
  await request.post("/auth/signup").send(userDetails);
  return userDetails;
}
