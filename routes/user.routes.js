const express = require('express')
const route = express.Router()
const controller = require('../controllers/user.controller')
const multer = require('multer')
const path = require('path')
const validatorHandler = require('../middleware/validator.handler')
const {getUserSchema, updateUsertSchema} = require('../schemas/user.schema')
const passport = require('passport')
const checkRole = require('../middleware/checkRole.handler')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = path.join(__dirname, '../public/database/avatars')
    cb(null, destination)
  },
  filename: (req, file, cb) => {
    const filenamme = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, filenamme)
  }
})
const upload = multer({storage})


route.get('/usersList',
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.getUsers)

route.get('/:id',
validatorHandler(getUserSchema, 'params'),
passport.authenticate('jwt', {session: false}),
controller.getUser)

route.delete('/:id',
validatorHandler(getUserSchema, 'params'),
passport.authenticate('jwt', {session: false}),
checkRole(['Admin']),
controller.deleteUser)

route.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUsertSchema, 'body'),
upload.single('avatar'),
passport.authenticate('jwt', {session: false}),
controller.updateUser)

route.patch('/avatar/:id',
validatorHandler(getUserSchema, 'params'),
upload.single('avatar'),
passport.authenticate('jwt', {session: false}),
controller.updateAvatarUser)

module.exports = route
