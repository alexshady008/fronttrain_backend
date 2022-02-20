const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../../lIbs/sequalize')

const USER_NAME = 'Users'


const userSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
  confirmation: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  tokenRecoveryPass: {
    type: DataTypes.STRING
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}


class User extends Model {
  static associate(models) {
    // El usuario tiene un cliente
    this.hasOne(models.Client, {
      as: 'client',
      foreignKey: 'userId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'User',
      tableName: USER_NAME,
      timestamps: false
    }
  }
}


module.exports = {
  USER_NAME,
  userSchema,
  User
}

