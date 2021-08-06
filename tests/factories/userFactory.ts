import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import { createUserBody } from "./bodyFactory";

export async function createUser () {
  const user = await createUserBody()

  await getRepository(User).insert(user);

  return user;
}
