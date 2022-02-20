require('dotenv').config()

const config = {
  url: process.env.URL,
  urlPage: process.env.URL_PAGE || 'http://localhost:3000',
  port: process.env.PORT || 4000,
  dbUrl: process.env.URL_DB,
  privateKey: process.env.PRIVATE_KEY
}

module.exports = config
