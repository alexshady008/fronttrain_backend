'use strict';
const {CATEGORY_NAME, categorySchema} = require('../models/category.model')
const {ORDER_NAME, orderSchema} = require('../models/order.model')
const {PRODUCT_NAME, productSchema} = require('../models/product.model')
const {USER_NAME, userSchema} = require('../models/user.model')
const {CLIENT_NAME, clientSchema} = require('../models/client.model')
const {ORDER_PRODUCT_NAME, orderProductSchema} = require('../models/ordersProducts.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_NAME, categorySchema);
    await queryInterface.createTable(USER_NAME, userSchema);
    await queryInterface.createTable(CLIENT_NAME, clientSchema);
    await queryInterface.createTable(ORDER_NAME, orderSchema);
    await queryInterface.createTable(PRODUCT_NAME, productSchema);
    await queryInterface.createTable(ORDER_PRODUCT_NAME, orderProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_NAME);
    await queryInterface.dropTable(PRODUCT_NAME);
    await queryInterface.dropTable(CATEGORY_NAME);
    await queryInterface.dropTable(ORDER_NAME);
    await queryInterface.dropTable(CLIENT_NAME);
    await queryInterface.dropTable(USER_NAME);
  }
};
