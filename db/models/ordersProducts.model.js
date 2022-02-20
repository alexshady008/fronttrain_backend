const {Sequelize, DataTypes, Model} = require('sequelize')
const {ORDER_NAME} = require('./order.model')
const {PRODUCT_NAME} = require('./product.model')

const ORDER_PRODUCT_NAME = 'OrderProducts'


const orderProductSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_NAME,
      key: 'id'
    }
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_NAME,
      key: 'id'
    }
  }
}


class OrderProduct extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tablename: ORDER_PRODUCT_NAME,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

module.exports = {
  ORDER_PRODUCT_NAME,
  orderProductSchema,
  OrderProduct
}
