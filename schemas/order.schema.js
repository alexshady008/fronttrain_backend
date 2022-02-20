const Joi = require("joi")

const id = Joi.number().integer()
const state = Joi.number().integer()
const clientId = Joi.number().integer()
const orderId = Joi.number().integer();
const productId = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required()
})

const createOrderSchema = Joi.object({
  state: state.required(),
  clientId: clientId.required()
})

const updateOrderSchema = Joi.object({
  state,
  clientId
})

const createItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required()
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  createItemSchema
}
