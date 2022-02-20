const UserService = require('../services/user.service')
const service = new UserService()
const bcrypt = require('bcrypt')

const controller = {
  getUsers: async (req, res, next) => {
    try {
      const users = await service.getAll()
      res.json(users)
      //res.json({message: 'List Users'})
    } catch (error) {
      next(error)
    }
  },

  getUser: async (req, res, next) => {
    try {
      const {id} = req.params
      const user = await service.getOne(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await service.deleteOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {id} = req.params
      const data = req.body
      const msg = await service.updateOne(id, data)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  updateAvatarUser: async (req, res, next) => {
    try {
      const {id} = req.params
      const {filename} = req.file
      const value = {avatar: filename}
      //console.log(value)
      const msg = await service.updateOne(id, value)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  }
}


module.exports = controller
