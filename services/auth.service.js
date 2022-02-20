const {Sequelize} = require('sequelize')
const {models} = require('../lIbs/sequalize')
const boom = require('@hapi/boom')
const UserService = require('../services/user.service')
const userService = new UserService()

class AuthService {
  async updateAll(data){
    const {percentageType, amount, productType, productBrand, carBrand, carType} = data
    // Options Set
    const options = {
      categoryId: productType,
      productBrand: productBrand
    }
    if (carBrand && carType) {
      options.carBrand = carBrand
      options.carType = carType
    }
    // Query
    //await models.Product.increment({price: 10}, {where: options})
    //await models.Product.update({price: price + ((price*10)/100)}, {where: options})
    if (percentageType=='aum'){
      await models.Product.update({price: Sequelize.literal(`price + ((price*${amount})/100)`)}, {where: options})
    } else if (percentageType=='desc') {
      await models.Product.update({price: Sequelize.literal(`price - ((price*${amount})/100)`)}, {where: options})
    }
    return {message: 'Successfull'}
  }

  async getByEmail(email){
    const user = await models.User.findOne({where: {email} })
    if (!user) throw boom.notFound('Usuario no encontrado!')
    return user
  }

  async signUser(id, token){
    const result = await models.User.update({tokenRecoveryPass: token}, {
      where: {id}
    })
    if (result.length < 1) throw boom.notImplemented('Cliente no actualizado!')
    return {message: 'Successfull'}
  }

  async changePassword(id, passHash) {
    // const user = await userService.findOne(id)
    // if (!user) throw boom.notFound('Cliente no encontrado!')
    const result = await models.User.update({password:passHash, tokenRecoveryPass: null},
      { where: {id} })
    if (result.length < 1) throw boom.notImplemented('Cliente no actualizado!')
    return {message: 'Successfull'}
  }
}

module.exports = AuthService
