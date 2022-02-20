const OrderService = require('../services/order.service')
const service = new OrderService()

const controller = {
  getOrders: async (req, res, next) => {
    try {
      const orders = await service.getAll()
      res.json(orders)
    } catch (error) {
      next(error)
    }
  },

  getOrder: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await service.getOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const data = req.body
      const msg = await service.createOne(data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await service.deleteOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const {id} = req.params
      const data = req.body
      const msg = await service.updateOne(id, data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  createItem: async (req, res, next) => {
    try {
      const data = req.body
      const newItem = await service.createItem(data)
      res.json(newItem)
    } catch (error) {
      next(error)
    }
  },
}


module.exports = controller
