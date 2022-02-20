const {models} = require('../lIbs/sequalize')
const boom = require('@hapi/boom')
const {productAtributes} = require('../Utils/showAtributes')
const {categoryProductAtributes} = require('../Utils/showAtributes')

class ProductService {

  async getAll(options){
    //console.log(options)
    const products = await models.Product.findAll(options)
    if (products.length < 1) throw boom.notFound('Productos no encontrados!')
    return products
  }

  async getOne(id){
    const product = await models.Product.findByPk(id, {
      attributes: productAtributes,
      include: {
        association: 'category',
        attributes: categoryProductAtributes
      }
    })
    if (!product) throw boom.notFound('Producto no encontrado!')
    return product
  }

  async createOne(data) {
    const {id} = data
    if (!id) await models.Product.create(data)
    else await models.Product.update(data, {
      where: {
        id
      }
    })
    return {message: 'Successfull'}
  }

  async deleteOne(id){
    const result = await models.Product.destroy({
      where: {
        id
      }
    })
    if (result < 1) throw boom.notImplemented('Producto no eliminado!')
    return {message: 'Successfull'}
  }

  async updateOne(id, data) {
    const result = await models.Product.update(data, {
      where: {
        id
      }
    })
    if (result[0] == 0) throw boom.notImplemented('Producto no actualizado!')
    return {message: 'Successfull'}
  }

}

module.exports = ProductService
