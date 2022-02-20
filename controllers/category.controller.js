const CategoryService = require('../services/category.service')
const service = new CategoryService()

const controller = {
  getCategories: async (req, res, next) => {
    try {
      const categories = await service.getAll()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const {id} = req.params
      const {offset, limit} = req.query
      const category = await service.getOne(id, Number(limit), Number(offset))
      res.json(category)
    } catch (error) {
      next(error)
    }
  },

  createCategory: async (req, res, next) => {
    try {
      const data = req.body
      const msg = await service.createOne(data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await service.deleteOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const {id} = req.params
      const data = req.body
      const msg = await service.updateOne(id, data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  }
}


module.exports = controller
