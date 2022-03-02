const whitelist = ['http://localhost:3000', 'http://localhost:3000/product', 'https://fronttrain.com.ar']
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true)
    } else {
      cb( new Error('No permitido') )
    }
  }
}

module.exports = options
