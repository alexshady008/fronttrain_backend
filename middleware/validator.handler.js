const boom = require('@hapi/boom')

const validatorHandler = (schema, params) => {
  return(req, res, next) => {
    const check = req[params]
    const value = schema.validate(check)
    if (value.error) next(boom.badRequest('Datos Incorrectos'))
    next()
  }
}

module.exports = validatorHandler
