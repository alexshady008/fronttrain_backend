const {Sequelize} = require('sequelize')
const {dbUrl, isProd} = require('../config/config')
//const setupModel = require('../db/models/index.model')

const options = {
  dialect:'mysql',
  logging: isProd ? false : true
}
if (isProd){
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

//const sequelize = new Sequelize(dbUrl, {dialect:'mysql'})
const sequelize = new Sequelize(dbUrl, options)

//Comprobar la conexion
// sequelize.authenticate()
// .then( ()=> {
//   console.log('Base de datos conectada!')
//   setupModel(sequelize)
// } )
// .catch( err => console.log(err) )

module.exports = sequelize
