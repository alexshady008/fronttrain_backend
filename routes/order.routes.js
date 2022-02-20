const express = require('express')
const route = express.Router()
const controller = require('../controllers/order.controller')
const validatorHandler = require('../middleware/validator.handler')
const {getOrderSchema, createOrderSchema, updateOrderSchema, createItemSchema} = require('../schemas/order.schema')
const passport = require('passport')
const checkRole = require('../middleware/checkRole.handler')

route.get('/orders',
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.getOrders)

route.post('/create',
validatorHandler(createOrderSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin','Client']),
controller.createOrder)

route.get('/:id',
validatorHandler(getOrderSchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin','Client']),
controller.getOrder)

route.delete('/:id',
validatorHandler(getOrderSchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin','Client']),
controller.deleteOrder)

route.patch('/:id',
validatorHandler(getOrderSchema, 'params'),
validatorHandler(updateOrderSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.updateOrder)

route.post('/create-item',
validatorHandler(createItemSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin','Client']),
controller.createItem)

module.exports = route
