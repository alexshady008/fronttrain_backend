const {models} = require('../lIbs/sequalize')
const boom = require('@hapi/boom')
const {orderAtributes, clientAtributes, itemAtributes} = require('../Utils/showAtributes')

class OrderService {

  async getAll(){
    const orders = await models.Order.findAll({
      attributes: orderAtributes,
      include: {
        association: 'client',
        attributes: clientAtributes
      }
    })
    if (orders.length < 1) throw boom.notFound('Ordenes no encontradas!')
    return orders
  }

  async getOne(id){
    const order = await models.Order.findByPk(id, {
      attributes: orderAtributes,
      include: [{
        association: 'client',
        attributes: clientAtributes
      }, {
        association: 'item',
        attributes: itemAtributes
      }]
      // include: ['client', 'item']
    })
    if (!order) throw boom.notFound('Orden no encontrada!')
    return order
  }

  async createItem(data){
    await models.OrderProduct.create(data)
    return {message: 'Successfull'}
  }

  async createOne(data){
    await models.Order.create(data)
    return {message: 'Successfull'}
  }

  async deleteOne(id){
    const result = await models.Order.destroy({
      where: {
        id
      }
    })
    if (result < 1) throw boom.notImplemented('Orden no eliminada!')
    return {message: 'Successfull'}
  }

  async updateOne(id, data) {
    const result = await models.Order.update(data, {
      where: {
        id
      }
    })
    if (result.length < 1) throw boom.notImplemented('Orden no actualizada!')
    return {message: 'Successfull'}
  }

}


module.exports = OrderService
