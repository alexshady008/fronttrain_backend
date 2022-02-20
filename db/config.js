const config = require('../config/config')
const url = config.dbUrl

module.exports = {
  development: {
    url,
    dialect: 'mysql'
  },
  production: {
    url,
    dialect: 'mysql'
  }
}
