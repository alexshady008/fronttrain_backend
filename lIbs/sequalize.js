const {Sequelize} = require('sequelize')
const {dbUrl} = require('../config/config')
//const setupModel = require('../db/models/index.model')

const sequelize = new Sequelize(dbUrl, {dialect:'mysql'})

//Comprobar la conexion
// sequelize.authenticate()
// .then( ()=> {
//   console.log('Base de datos conectada!')
//   setupModel(sequelize)
// } )
// .catch( err => console.log(err) )

module.exports = sequelize
