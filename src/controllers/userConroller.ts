import { Request, Response } from "express";
import joi from "joi";
import bcrypt from "bcrypt";
import * as uuid from "uuid";

import * as userService from "../services/userService";

async function signUp (req: Request, res:Response) {
  
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.valid(joi.ref('password')).required()
  })
  const { error } = schema.validate(req.body)
  console.log(error)
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

async function SignIn (req: Request, res:Response) {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  })
  const { error } = schema.validate(req.body)
  if(error) return res.status(400).send({ error: error.details[0].message })

  const {email, password} = req.body

  try{
    const emailRegistered = await userService.verifyEmail(email)
    if(!emailRegistered) return res.sendStatus(400)

    if(emailRegistered.password && bcrypt.compareSync(password, emailRegistered.password)) {
      const token = uuid.v4()

      const body = {userId: emailRegistered.id, token}

      await userService.createSession(body)

      res.status(200).send(token)
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

export { signUp, getUsers }