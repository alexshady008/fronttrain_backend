const express = require('express')
const route = express.Router()
const authRoute = require('./auth.routes')
const productRoute = require('./product.routes')
const userRoute = require('./user.routes')
const clientRoute = require('./client.routes')
const categoryRoute = require('./category.routes')
const orderRoute = require('./order.routes')

const mainRoutes = (app) => {
  app.use('/api', route)
  route.use('/auth', authRoute)
  route.use('/product', productRoute)
  route.use('/user', userRoute)
  route.use('/client', clientRoute)
  route.use('/category', categoryRoute)
  route.use('/order', orderRoute)
}

module.exports = mainRoutes
