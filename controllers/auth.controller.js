const UserService = require('../services/user.service')
const userService = new UserService()
const AuthService = require('../services/auth.service')
const authService = new AuthService()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {privateKey, receiverMail} = require('../config/config')
const deleteProperties = require('../Utils/deleteProperties')
const sendEmail = require('../Utils/setNodeMailer')
const {url, urlPage} = require('../config/config')
const boom = require('@hapi/boom')
const setOrderMessage = require('../Utils/setOrderMsg')


const controller = {
  createUser: async (req, res, next) => {
    try {
      const data = req.body
      const {password} = data
      const passHash = await bcrypt.hash(password, 10)
      data.password = passHash
      //if (req.file) data.file = req.file
      const newUser = await userService.createOne(data)
      const infoEmail = await sendEmail(newUser.email,
        'Confirmar Email',
          `<b>Confirma tu email haciendo click aquí: ${urlPage}/userConfirm/${newUser.id}</b>`)
      console.log('message sent: ', infoEmail)
      //Confirma tu email haciendo click aquí: ${url}/auth/confirm/${newUser.id}
      res.json(newUser)
    } catch (error) {
      next(error)
    }
  },

  confirmUser: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await userService.confirmOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const user = req.user
      deleteProperties(user)
      const token = jwt.sign( {sub: user.id}, privateKey, {expiresIn: '1h'} )
      //console.log('Token caducidad: ', token)
      const result = await user.update( {token} )
      if (result.length < 1) next(boom.notImplemented('Usuario no actualizado!'))
      res.json({
        ...user.dataValues,
        token
      })
    } catch (error) {
      next(error)
    }
  },

  checkSession: (req, res, next) => {
    //console.log('Check Sesion!',)
    req.user ? res.json({session: 'login'}) : res.json({session: 'logout'})
  },

  sendOrder: async (req, res, next) => {
    try {
      //console.log('User: ', req.user)
      //console.log('Body: ', req.body)
      const {email, userName} = req.user
      const {listProducts, totalProducts, totalPrice} = req.body
      const msgOrder = setOrderMessage(listProducts, totalProducts, totalPrice)
      //console.log(msgOrder)
      const infoEmail = await sendEmail(receiverMail,`Nuevo Pedido de ${userName}, desde ${email}` , msgOrder)
      console.log('message sent: ', infoEmail)
      res.json({message: 'Successfull'})
    } catch (error) {
      next(error)
    }
  },

  recoveryPassword: async (req, res, next) => {
    try {
      const {email} = req.body
      const user = await authService.getByEmail(email)
      const {id, userName} = user
      //console.log('user: ', user)
      const token = jwt.sign({sub:id}, privateKey, {expiresIn: '1h'} )
      //console.log('Token: ', token)
      await authService.signUser(id, token)
      const infoEmail = await sendEmail(email,
        'Recuperar Cuenta',
          `<b>Hola, tu nombre de usuario es: ${userName}. </b>
          <br>
          <b>Puedes cambiar tu contraseña haciendo click aquí: ${urlPage}/change-password?id=${id}&token=${token}</b>`)
      //console.log('message sent: ', infoEmail)
      res.json({message: 'Successfull'})
    } catch (error) {
      next(error)
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const {password} = req.body
      const {id, token} = req.query
      // const user = await userService.getOne(id)
      jwt.verify(token, privateKey, (err, decoded)=>{
        if (err) next(boom.badData('Ah ocurrido un error!'))
      })
      const passHash = await bcrypt.hash(password, 10)
      const msg = await authService.changePassword(id, passHash)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  contact: async (req, res, next) => {
    try {
      const {name, email, location, phone, message} = req.body
      //console.log('message Received: ', req.body)
      const infoEmail = await sendEmail(receiverMail,
        `Nuevo mensaje de: ${name}, Email: ${email}, Telefono: ${phone}, Ubicación: ${location}`,
          `${message}`)
      console.log('message sent: ', infoEmail)
      res.json({message: 'Successfull'})
    } catch (error) {
      next(error)
    }
  },

  updatePrices: async (req, res, next) => {
    try {
      const data = req.body
      const user = req.user
      const msg = await authService.updateAll(data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  }
}


module.exports = controller

