const {Sequelize, DataTypes, Model} = require('sequelize')

const CATEGORY_NAME = 'Categories'


const categorySchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type:DataTypes.STRING,
    unique: true
  },
  description: {
    allowNull: false,
    type:DataTypes.STRING
  },
  image: {
    type:DataTypes.STRING
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}


class Category extends Model {
  static associate(models){
    // La categoria tiene un producto
    // Category.hasOne(Product)
    this.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      modelName: 'Category',
      tableName: CATEGORY_NAME,
      timestamps: false
    }
  }
}


module.exports =  {
  CATEGORY_NAME,
  categorySchema,
  Category
}
