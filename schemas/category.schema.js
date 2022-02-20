const Joi = require("joi")

const id = Joi.number().integer()
const name = Joi.string()
const description = Joi.string()

const getCategorySchema = Joi.object({
  id: id.required()
})

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required()
})

const updateCategorySchema = Joi.object({
  name,
  description
})

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema
}
