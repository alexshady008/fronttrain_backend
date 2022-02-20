const express = require('express')
const route = express.Router()
const controller = require('../controllers/category.controller')
const validatorHandler = require('../middleware/validator.handler')
const {getCategorySchema, createCategorySchema, updateCategorySchema} = require('../schemas/category.schema')
const passport = require('passport')
const checkRole = require('../middleware/checkRole.handler')

route.get('/categories',
controller.getCategories)

route.get('/:id',
validatorHandler(getCategorySchema, 'params'),
controller.getCategory)

route.post('/create',
validatorHandler(createCategorySchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.createCategory)

route.delete('/:id',
validatorHandler(getCategorySchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.deleteCategory)

route.patch('/:id',
validatorHandler(getCategorySchema, 'params'),
validatorHandler(updateCategorySchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.updateCategory)


module.exports = route
