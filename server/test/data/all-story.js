import faker from "faker";

export const allStroy = [];

for (let i = 0; i < 4; i++) {
  const story = {
    title: faker.random.word(),
    address: faker.address.streetAddress(true),
    campsite: faker.internet.url(),
    description: faker.random.words(5),
  };
  allStroy.push(story);
}
