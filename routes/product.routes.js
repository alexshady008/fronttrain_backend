const express = require('express')
const route = express.Router()
const controller = require('../controllers/product.controller')
const multer = require('multer')
const path = require('path')
const validatorHandler = require('../middleware/validator.handler')
const {createProductSchema, getProductSchema, updateProductSchema, productFilterSchema} = require('../schemas/product.schema')
const passport = require('passport')
const checkRole = require('../middleware/checkRole.handler')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let pathDest = path.join(__dirname, '../public/database/products')
    cb(null, pathDest)
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, filename)
  }
})
const upload = multer({storage})


route.get('/products',
controller.getProducts)

route.post('/productsFilter',
validatorHandler(productFilterSchema, 'body'),
controller.getProductsFilter)

route.get('/:id',
validatorHandler(getProductSchema, 'params'),
controller.getProduct)

route.post('/create',
upload.single('image'),
validatorHandler(createProductSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.createProduct)

route.delete('/:id',
validatorHandler(getProductSchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.deleteProduct)

route.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
upload.single('image'),
controller.updateProduct)


module.exports = route
