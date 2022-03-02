const express = require('express')
const mainRoutes = require('./routes/index.routes')
const methodOverride = require('method-override');
const config = require('./config/config')
const cors = require('cors')
const passport = require('passport')
const {logError, boomError, sequelizeError, showError} = require('./middleware/error.handler')
const sequelize = require('./lIbs/sequalize')
const setupModel = require('./db/models/index.model')
const options = require('./Utils/corsOption')

const app = express()

//Middleware - setup
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'));
//app.use(cors(options))
app.use(cors())
app.use(passport.initialize())
///Requerir estrategia de passport
require('./lIbs/localStrategy')
require('./lIbs/jwtStrategy')

//Home
app.get('/', (req, res) => res.send('Hola Mundo'))

//Routes
mainRoutes(app)

//Error
app.use(logError)
app.use(boomError)
app.use(sequelizeError)
app.use(showError)
// logError
// boomError
// showError

//Listen
app.listen( config.port, () => {
  console.log(`Server Listen in port: ${config.port}`)

  //Conecta a la base de datos
  sequelize.authenticate()
  .then( ()=> {
    console.log('Base de datos conectada!')
    setupModel(sequelize)
  } )
  .catch( err => console.log(err) )

})
