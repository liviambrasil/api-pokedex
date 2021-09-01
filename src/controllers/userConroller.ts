import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as uuid from "uuid";

import * as userService from "../services/userService";
import { signUpSchema } from "../schemas/signUpSchema";
import { signInSchema } from "../schemas/signInSchema";

async function signUp (req: Request, res:Response) {
  
  const { error } = signUpSchema.validate(req.body)
  if(error) return res.status(400).send({ error: error.details[0].message })

  const {email, password} = req.body

  try{
    const isEmailRegistered = await userService.verifyEmail(email)
    if(isEmailRegistered) return res.sendStatus(409)

    const hashPassword = bcrypt.hashSync(password, 10)

    const body = {email: req.body.email, password: hashPassword}

    await userService.signUpUser(body)

    res.sendStatus(201)
  }
  catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

async function signIn (req: Request, res:Response) {

  const { error } = signInSchema.validate(req.body)
  if(error) return res.status(400).send({ error: error.details[0].message })

  const {email, password} = req.body

  try{
    const emailRegistered = await userService.verifyEmail(email)
    if(!emailRegistered) return res.sendStatus(400)

    if(emailRegistered.password && bcrypt.compareSync(password, emailRegistered.password)) {
      const token = uuid.v4()

      const body = {userId: emailRegistered.id, token}

      await userService.createSession(body)

      res.send({token: token})
    }
  }
  catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  }

export { signUp, signIn, getUsers }