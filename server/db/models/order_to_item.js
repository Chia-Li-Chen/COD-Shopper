const Sequelize = require('sequelize')
const db = require('../db')

const OrderToItem = db.define('order_to_item', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderToItem
