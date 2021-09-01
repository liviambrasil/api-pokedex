import joi from "joi";

export const signUpSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.valid(joi.ref('password')).required()
})