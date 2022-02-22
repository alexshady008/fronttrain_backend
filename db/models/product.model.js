const {Sequelize, DataTypes, Model} = require('sequelize')
const {CATEGORY_NAME} = require('./category.model')

const PRODUCT_NAME = 'Products'


const productSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // productType: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  productBrand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carBrand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_NAME,
      key: 'id'
    }
  }
}


class Product extends Model {
  static associate(models) {
    // EL producto pertenece a una categoria
    // Product.belongTo(Category)
    this.belongsTo(models.Category, {as: 'category'})
    // El producto tiene muchas ordenes
    // Product.belongToMany(Order, {throught: OrdersProducts})
    // this.belongsToMany(models.Order, {
    //   as: 'item',
    //   through: models.OrderProduct,
    //   foreignKey: 'productId',
    //   otherKey: 'orderId'
    // })
  }

  static config(sequelize) {
    return {
      sequelize,
      tablename: PRODUCT_NAME,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {
  PRODUCT_NAME,
  productSchema,
  Product
}
