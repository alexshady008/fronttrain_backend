const ProductService = require('../services/product.service')
const service = new ProductService()
const {productAtributes} = require('../Utils/showAtributes')

const controller = {
  getProducts: async (req, res, next) => {
    try {
      const {offset, limit} = req.query
      const options = {
        attributes: productAtributes,
        offset: Number(offset),
        limit: Number(limit)
      }
      const products = await service.getAll(options)
      res.json(products)
    } catch (error) {
      next(error)
    }
  },

  getProductsFilter: async (req, res, next) => {
    try {
      const {offset, limit} = req.query
      //console.log('Req Query: ', req.query)
      const {categoryId, productBrand, carBrand, carType} = req.body
      //console.log('Req Body: ', req.body)
      const options = {
        attributes: productAtributes,
        offset: Number(offset),
        limit: Number(limit),
        where: {}
      }
      if (categoryId!=0) options.where.categoryId = categoryId
      if (productBrand!='') options.where.productBrand = productBrand
      if (carBrand!='') options.where.carBrand = carBrand
      if (carType!='') options.where.carType = carType
      console.log('Opciones: ', options)
      const products = await service.getAll(options)
      res.json(products)
    } catch (error) {
      next(error)
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const {id} = req.params
      const product = await service.getOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  },

  createProduct: async (req, res, next) => {
    try {
      var data = req.body
      if (req.file) {
        const {filename} = req.file
        data = {
          ...data,
          image: filename
        }
      }
      console.log('data: ', data)
      const msg = await service.createOne(data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await service.deleteOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  updateProduct: async (req, res, next) => {
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
