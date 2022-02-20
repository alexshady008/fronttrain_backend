const {models} = require('../lIbs/sequalize')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const {privateKey} = require('../config/config')
const deleteProperties = require('../Utils/deleteProperties')
const {userAtributes} = require('../Utils/showAtributes')
const {clientAtributes} = require('../Utils/showAtributes')

class UserService {

  async getAll(){
    const users = await models.User.findAll({
      where: {
        confirmation: 'yes'
      },
      attributes: userAtributes
    })
    if (users.length < 1) throw boom.notFound('Usuarios no encontrados!')
    return users
  }

  async getOne(id){
    const user = await models.User.findByPk(id, {
      where: {
        confirmation: 'yes'
      },
      attributes: userAtributes,
      include: {
        association: 'client',
        attributes: clientAtributes
      }
    })
    if (!user) throw boom.notFound('Usuario no encontrado!')
    return user
  }

  async createOne(data){
    const newUser = await models.User.create(data)
    deleteProperties(newUser)
    return newUser
  }

  async confirmOne(id){
    const user = await models.User.findByPk(id)
    if (!user) throw boom.notFound('NotFound')
    deleteProperties(user)
    const token = jwt.sign( {sub: user.id}, privateKey, {expiresIn: '1h'} )
    const result = await user.update({confirmation:'yes', token: token})
    if (result.length < 1) throw boom.notImplemented('Usuario no confirmado!')
    return {
      ...user.dataValues
    }
  }

  async deleteOne(id){
    const result = await models.User.destroy({
      where: {
        id
      }
    })
    if (result < 1) throw boom.notImplemented('Usuario no eliminado!')
    return {message: 'Successfull'}
  }

  async updateOne(id, data) {
    const [result] = await models.User.update(data, {
      where: {
        id
      }
    })
    console.log(result)
    if (!result || result==0 ) throw boom.notImplemented('Usuario no actualizado!')
    return {message: 'Successfull'}
  }

}


module.exports = UserService
