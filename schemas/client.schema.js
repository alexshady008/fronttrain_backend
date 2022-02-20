const Joi = require("joi")

const id = Joi.number().integer()
const name = Joi.string().max(20)
const lastName = Joi.string().max(20)
const storeName = Joi.string().max(20)
const storeDescription = Joi.string().min(10).max(255)
const phoneNumber = Joi.number()
const location = Joi.string()
const userId = Joi.number().integer()

const getClientSchema = Joi.object({
  id: id.required()
})

const createClientSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  storeName: storeName.required(),
  storeDescription: storeDescription.required(),
  phoneNumber: phoneNumber.required(),
  location: location.required(),
  userId: userId.required()
})

const updateClienttSchema = Joi.object({
  name,
  lastName,
  storeName,
  storeDescription,
  phoneNumber,
  location,
  userId
})

module.exports = {
  getClientSchema,
  createClientSchema,
  updateClienttSchema
}
