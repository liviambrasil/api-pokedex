import { NextFunction, Request, Response } from "express";
import { validateUser } from "../services/userService";

async function verifyToken (req: Request, res: Response, next:NextFunction) {
    const authorization = req.headers['authorization']
    const token = authorization?.replace('Bearer ', '')

    const validUser = await validateUser(token)
                
    if(!validUser) return res.sendStatus(401)

    else res.locals.user = validUser

    next()
}

export {verifyToken}