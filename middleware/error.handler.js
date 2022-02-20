const {Sequelize} = require('sequelize');

const logError = (err, req, res, next) => {
  console.log(err)
  next(err)
}

const boomError = (err, req, res, next) => {
  if (err.isBoom) {
    const {payload}  = err.output
    res.status(200).json({
      message: 'Error',
      err: payload.message
    })
  }
  next(err)
}

const sequelizeError = (err, req, res, next) => {
  if (err instanceof Sequelize){
    console.log('Sequelize Error!');
    console.log(err);
    res.status(503).json({
      message: 'Error',
      err
    });
  }
  next(err);
};

const showError = (err, req, res, next) => {
  //console.log(' ERRORRR! ', err.fields);
  res.status(200).json({
    message: 'Error',
    err: err.message
  })
}


module.exports = {
  logError,
  boomError,
  sequelizeError,
  showError
}
