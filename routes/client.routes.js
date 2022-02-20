const express = require('express')
const route = express.Router()
const controller = require('../controllers/client.controller')
const validatorHandler = require('../middleware/validator.handler')
const {getClientSchema, createClientSchema, updateClienttSchema} = require('../schemas/client.schema')
const passport = require('passport')
const checkRole = require('../middleware/checkRole.handler')

route.get('/clients',
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.getClients)

route.post('/create',
validatorHandler(createClientSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.createClient)

route.get('/:id',
validatorHandler(getClientSchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin','Client']),
controller.getClient)

route.delete('/:id',
validatorHandler(getClientSchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.deleteClient)

route.patch('/:id',
validatorHandler(getClientSchema, 'params'),
validatorHandler(updateClienttSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin','Client']),
controller.updateClient)

module.exports = route
