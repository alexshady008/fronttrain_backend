const Joi = require("joi")

const id = Joi.number().integer()
const userName = Joi.string()
const email = Joi.string().email()
const password = Joi.string()
const token = Joi.string()
const name = Joi.string()
const location = Joi.string()
const phone = Joi.number().integer()
const message = Joi.string()

const percentageType = Joi.string()
const amount = Joi.number()
const productType = Joi.number().integer()
const productBrand = Joi.string()
const carBrand = Joi.string()
const carType = Joi.string()

const listProducts = Joi.array()
const totalProducts = Joi.number().integer()
const totalPrice = Joi.number()


const loginSchema = Joi.object({
  userName: userName.required(),
  password: password.required()
})

const recoveryPassSchema = Joi.object({
  email: email.required()
})

const changePassSchema = Joi.object({
  //token: token.required(),
  password: password.required()
})

const contactSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
  location: location.required(),
  message: message.required()
})

const updatePricesSchema = Joi.object({
  percentageType: percentageType.required(),
  amount: amount.required(),
  productType: productType.required(),
  productBrand: productBrand.required(),
  carBrand,
  carType
})

const orderSchema = Joi.object({
  listProducts: listProducts.required(),
  totalProducts: totalProducts.required(),
  totalPrice: totalPrice.required()
})

module.exports = {
  loginSchema,
  recoveryPassSchema,
  changePassSchema,
  updatePricesSchema,
  contactSchema,
  orderSchema
}
