const ClientService = require('../services/client.service')
const service = new ClientService()

const controller = {
  getClients: async (req, res, next) => {
    try {
      const clients = await service.getAll()
      res.json(clients)
    } catch (error) {
      next(error)
    }
  },

  getClient: async (req, res, next) => {
    try {
      const {id} = req.params
      const client = await service.getOne(id)
      res.json(client)
    } catch (error) {
      next(error)
    }
  },

  createClient: async (req, res, next) => {
    try {
      const data = req.body
      const newClient = await service.createOne(data)
      res.json(newClient)
    } catch (error) {
      next(error)
    }
  },

  deleteClient: async (req, res, next) => {
    try {
      const {id} = req.params
      const msg = await service.deleteOne(id)
      res.json(msg)
    } catch (error) {
      next(error)
    }
  },

  updateClient: async (req, res, next) => {
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
