const nodemailer = require('nodemailer')
const hostMail =  'mail.alexshady.com' // 'mail.fronttrain.com.ar'
const portMail = 587
const userMail = 'cheshirex@alexshady.com' // 'contacto@fronttrain.com.ar'
const passMail = 'alexshady003' //'fronttrain003'

const sendEmail = async (receivers, title, msg) => {

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
