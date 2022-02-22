const nodemailer = require('nodemailer')
const config = require('../config/config')
const hostMail =  config.hostMail
const portMail = 587
const userMail = config.userMail
const passMail = config.passMail

const sendEmail = async (receivers, title, msg) => {
  console.log(process.env.USER_MAIL)
  const transporter = nodemailer.createTransport({
    host: hostMail,
    port: 587,
    secure: false,
    auth: {
      user: userMail,
      pass: passMail
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const info = await transporter.sendMail({
    from: `"Front Train: " <${userMail}>`,  //ACLARACION: en el 'from' agregar solo el email y ninguna otra palabra
    to: receivers,
    subject: title,
    html: msg
  })

  return info
}

module.exports = sendEmail
