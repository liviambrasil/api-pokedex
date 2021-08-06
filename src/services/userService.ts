import { Request, Response } from "express";
import { Session } from "inspector";
import { getRepository } from "typeorm";

import User from "../entities/User";

async function verifyEmail (email: string): Promise<User|undefined> {
  const findEmail = await getRepository(User).findOne({email})

  return findEmail
}

async function signUpUser(body: object) {
  await getRepository(User).insert(body)
}

async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}

async function createSession (body: object) {
  await getRepository(Session).insert(body)
}

export { getUsers, verifyEmail, signUpUser, createSession }
