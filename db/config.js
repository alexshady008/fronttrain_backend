const config = require('../config/config')
const url = config.dbUrl

module.exports = {
  development: {
    url,
    dialect: 'postgres'
  },
  production: {
    url,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}


// 13:30
// 14:55
