const Joi = require("joi")

const id = Joi.number().integer()
const codeConfirm = Joi.number().integer()
const userName = Joi.string().max(20)
const email = Joi.string().email().max(40)
const password = Joi.string().max(40)
const role = Joi.string()

const getUserSchema = Joi.object({
  id: id.required()
})

const createUserSchema = Joi.object({
  userName: userName.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
})

const confirmUserSchema = Joi.object({
  codeConfirm: codeConfirm.required()
})

const updateUsertSchema = Joi.object({
  userName,
  email,
  password,
  role
})

module.exports = {
  getUserSchema,
  createUserSchema,
  confirmUserSchema,
  updateUsertSchema
}
