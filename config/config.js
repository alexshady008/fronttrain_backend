require('dotenv').config()

const config = {
  url: process.env.URL,
  urlPage: process.env.URL_PAGE || 'http://localhost:3000',
  port: process.env.PORT || 4000,
  isProd: process.env.NODE_ENV === 'production',
  dbUrl: process.env.DATABASE_URL,
  privateKey: process.env.PRIVATE_KEY,
  receiverMail: process.env.RECEIVER_MAIL || 'alexshady008.2@gmail.com',
  hostMail: process.env.HOST_MAIL || 'mail.alexshady.com', // 'mail.fronttrain.com.ar'
  userMail: process.env.USER_MAIL || 'test@alexshady.com',   //'cheshirex@alexshady.com' // 'contacto@fronttrain.com.ar'
  passMail: process.env.PASS_MAIL || 'alexshady003' //'fronttrain003'
}

module.exports = config
