const User = require('./user')
const UserRole = require('./user_role')
const Order = require('./order')
const PaymentInfo = require('./payment_info')
const PaymentType = require('./payment_type')
const Shipment = require('./shipment')
const Product = require('./product')
const ProductGroup = require('./product_group')
const OrderStatus = require('./order_status')
const OrderToItem = require('./order_to_item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order, {through: OrderToItem})
Order.belongsToMany(Product, {through: OrderToItem})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  UserRole,
  Order,
  PaymentInfo,
  PaymentType,
  Shipment,
  Product,
  ProductGroup,
  OrderStatus,
  OrderToItem
}
