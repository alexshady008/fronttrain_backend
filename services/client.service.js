const {models} = require('../lIbs/sequalize')
const boom = require('@hapi/boom')
const {clientAtributes, userAtributes, orderAtributes, itemAtributes} = require('../Utils/showAtributes')
const deleteProperties = require('../Utils/deleteProperties')


class ClientService {

  async getAll(){
    const clients = await models.Client.findAll({
      attributes: clientAtributes
    })
    if (clients.length < 1) throw boom.notFound('Clientes no encontrados!')
    return clients
  }

  async getOne(id){
    const client = await models.Client.findByPk(id, {
      attributes: clientAtributes,
      include: [{
        association: 'user',
        attributes: userAtributes
      },{
        association: 'order',
        attributes: orderAtributes,
        include: {
          association: 'item',
          attributes: itemAtributes
        }
      }]
      // include: ['user', 'order']
    })
    if (!client) throw boom.notFound('Cliente no encontrado!')
    return client
  }

  async createOne(data){
    const {userId} = data
    const newClient = await models.Client.create(data)
    deleteProperties(newClient)
    await models.User.update({role: 'Client'}, {
      where: {id: userId}
    })
    return newClient
  }

  async deleteOne(id){
    const result = await models.Client.destroy({
      where: {
        id
      }
    })
    if (result < 1) throw boom.notImplemented('Cliente no eliminado!')
    return {message: 'Successfull'}
  }

  async updateOne(id, data) {
    const result = await models.Client.update(data, {
      where: {
        id
      }
    })
    if (result.length < 1) throw boom.notImplemented('Cliente no actualizado!')
    return {message: 'Successfull'}
  }

}


module.exports = ClientService
