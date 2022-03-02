const config = require('../config/config')
const url = config.dbUrl

module.exports = {
  development: {
    url,
    dialect: 'mysql'
  },
  production: {
    url,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}


// 13:30
// 14:55
