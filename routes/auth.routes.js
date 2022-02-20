const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')
const multer = require('multer')
const path = require('path')
const validatorHandler = require('../middleware/validator.handler')
const {getUserSchema, createUserSchema, confirmUserSchema} = require('../schemas/user.schema')
const {loginSchema, recoveryPassSchema, changePassSchema, updatePricesSchema, contactSchema} = require('../schemas/auth.schema')
const passport = require('passport')
const checkRole = require('../middleware/checkRole.handler')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = path.join(__dirname, '../public/database/avatars')
    cb(null, destination)
  },
  filename: (req, file, cb) => {
    const filenamme = `${file.fieldname}-${Date.now}${path.extname(file.originalname)}`
    cb(null, filenamme)
  }
})
const upload = multer({storage})


route.post('/register',
validatorHandler(createUserSchema, 'body'),
//upload.single('avatar'),
controller.createUser)

route.get('/confirm/:id',
validatorHandler(getUserSchema, 'params'),
controller.confirmUser)

route.post('/login',
validatorHandler(loginSchema, 'body'),
passport.authenticate('local', {session:false} ),
controller.loginUser)

route.get('/checkSession',
passport.authenticate('jwt', {session:false} ),
controller.checkSession)

route.post('/recovery-password',
validatorHandler(recoveryPassSchema, 'body'),
controller.recoveryPassword)

route.post('/change-password',
validatorHandler(changePassSchema, 'body'),
controller.changePassword)

route.post('/change-prices',
validatorHandler(updatePricesSchema, 'body'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.updatePrices)

route.post('/contact',
validatorHandler(contactSchema, 'body'),
//passport.authenticate('local', {session:false} ),
controller.contact)

module.exports = route
