const {Strategy, ExtractJwt} = require('passport-jwt')
const {privateKey} = require('../config/config')
const passport = require('passport')
const {models} = require('./sequalize')
const boom = require('@hapi/boom')

const options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : privateKey,
  //issuer = 'accounts.examplesoft.com',
  //audience = 'yoursite.net'
}

passport.use(new Strategy(options, async (jwt_payload, done) => {
  // 1) Devolver al usuario
  try {
    const id = jwt_payload.sub
    const user = await models.User.findByPk(id)
    if (!user) return done(boom.unauthorized('Debes loguearte para continuar'), false)
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }

  // 2) Devolver el payload
  //return done(null, payload)
} ))
