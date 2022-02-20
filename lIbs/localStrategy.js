const passport = require('passport')
const {Strategy} = require('passport-local')
const {models} = require('./sequalize')
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')

const options = {
  usernameField: 'userName',
  passwordField: 'password'
}

passport.use(new Strategy(options, async (userName, password, done) => {
  console.log(userName)
  try {
    const user = await models.User.findOne({where:{userName}})
    if (!user) return done(boom.unauthorized('Datos Incorrectos!'), false)
    if (!user.confirmation) return done(boom.unauthorized('Confirma tu email!'), false)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return done(boom.unauthorized('Contraseña Incorrecta!'), false)
    console.log(user)
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))
