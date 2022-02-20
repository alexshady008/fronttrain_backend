const {Sequelize, DataTypes, Model} = require('sequelize')
const {USER_NAME} = require('./user.model')
const CLIENT_NAME = 'Clients'


const clientSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  storeName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  storeDescription: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phoneNumber: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true
  },
  location: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_NAME,
      key: 'id'
    }
  }
}


class Client extends Model {
  static associate(models) {
    // El cliente pertenece a un usuario
    this.belongsTo(models.User, {as: 'user'})
    // El cliente tiene muchas ordenes
    this.hasMany(models.Order, {
      as: 'order',
      foreignKey: 'clientId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Client',
      tableName: CLIENT_NAME,
      timestamps: false
    }
  }
}


module.exports = {
  CLIENT_NAME,
  clientSchema,
  Client
}

