import faker from "faker";

async function createUserBody () {
    return {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric()
    }
}

export { createUserBody }