const {productSchema, Product} = require('./product.model')
const {categorySchema, Category} = require('./category.model')
const {userSchema, User} = require('./user.model')
const {clientSchema, Client} = require('./client.model')
const {orderSchema, Order} = require('./order.model')
const {orderProductSchema, OrderProduct} = require('./ordersProducts.model')


const setupModel = (sequelize) => {
  Product.init(productSchema, Product.config(sequelize))
  Category.init(categorySchema, Category.config(sequelize))
  User.init(userSchema, User.config(sequelize))
  Client.init(clientSchema, Client.config(sequelize))
  Order.init(orderSchema, Order.config(sequelize))
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize))

  Product.associate(sequelize.models)
  Category.associate(sequelize.models)
  User.associate(sequelize.models)
  Client.associate(sequelize.models)
  Order.associate(sequelize.models)
}


module.exports = setupModel
