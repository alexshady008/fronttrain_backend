const {Sequelize, DataTypes, Model} = require('sequelize')
const {CLIENT_NAME} = require('./client.model')

const ORDER_NAME = 'Orders'


const orderSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  clientId: {
    field: 'client_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLIENT_NAME,
      key: 'id'
    }
  }
}


class Order extends Model {
  static associate(models) {
    // La orden pertenece a un usuario
    // Order.belongTo(User)
    this.belongsTo(models.Client, {as: 'client'})
    // La orden tiene muchos productos
    // User.belongToMany(Product, {throught: OrdersProducts})
    this.belongsToMany(models.Product, {
      as: 'item',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tablename: ORDER_NAME,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = {
  ORDER_NAME,
  orderSchema,
  Order
}
