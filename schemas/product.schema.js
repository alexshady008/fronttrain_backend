const Joi = require("joi")

const id = Joi.number().integer().allow(null)
const description = Joi.string()
const price = Joi.number()
const categoryId = Joi.number()
const image = Joi.string().allow('', null)
const productBrand = Joi.string()
const carBrand = Joi.string()
const carType = Joi.string()

const getProductSchema = Joi.object({
  id: id.required()
})

const createProductSchema = Joi.object({
  id,
  image,
  description: description.required(),
  price: price.required(),
  categoryId: categoryId.required(),
  productBrand: productBrand.required(),
  carBrand: carBrand.required(),
  carType: carType.required()
})

const productFilterSchema = Joi.object({
  categoryId: categoryId.allow(''),
  productBrand: productBrand.allow(''),
  carBrand: carBrand.allow(''),
  carType: carType.allow(''),
})

const updateProductSchema = Joi.object({
  description,
  price,
  categoryId,
  productBrand,
  carBrand,
  carType
})

module.exports = {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  productFilterSchema
}
