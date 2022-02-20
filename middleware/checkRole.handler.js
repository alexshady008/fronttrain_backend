// Roles = User, Client, Admin
//const roles = ['Client', 'Admin']
const boom = require('@hapi/boom')

const checkRole = (roles) => {
  return(req, res, next) => {
    const user = req.user
    const role = user.role
    if (roles.includes(role)) next()
    else next(boom.unauthorized('Rol No Autorizado'))
  }
}

module.exports = checkRole
