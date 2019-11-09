const router = require('express').Router()
const {Order} = require('../db/models/models_index')
const {OrderToItem} = require('../db/models/models_index')
const {Product} = require('../db/models/models_index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    if (orders) {
      res.json(orders)
    } else {
      res.status(404).send('Orders not found')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/getCart', async (req, res, next) => {
  try {
    let existingCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        orderSubmittedDate: null
      }
    })
    existingCart = await Order.findAll({
      includes: [
        {model: Product, through: {where: {id: existingCart.dataValues.id}}}
      ]
    })
    if (existingCart) {
      res.json(existingCart)
    } else {
      res.status(404).send('No existing cart for this user.')
    }
  } catch (err) {
    next(err)
  }
})

//Create new order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({...req.body, totalPrice: 0})
    if (newOrder) {
      res.json({total: newOrder.totalPrice})
    } else {
      res.status(500).send('Order creation failed.')
    }
  } catch (err) {
    next(err)
  }
})

//Add product to order item table
//Updating order with new total price
router.post('/add', async (req, res, next) => {
  try {
    //gets any existing OrderItems that have the same product for this orderId
    const existingOrderToItem = await OrderToItem.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    let OrderToItemInstance = null

    //Checks to see if the product is currently on this order
    if (existingOrderToItem) {
      //Add the new quantity to the current quatity when the product is already on the order
      OrderToItemInstance = await OrderToItem.increment('quantity', {
        by: req.body.quantity,
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId
        }
      })
    } else {
      //Adds the product to the order with the quantity passed in
      OrderToItemInstance = await OrderToItem.create(req.body)
    }

    //Checks to see that the OrderToItem instance was either created or its quantity
    //was increased.
    if (OrderToItemInstance) {
      //If it was we increase the total price by the new product's price
      //times the amount added
      OrderToItemInstance = OrderToItemInstance[0][0][0]
      const newProduct = await Product.findByPk(OrderToItemInstance.productId)
      const updatedOrder = await Order.increment('totalPrice', {
        by: newProduct.price * OrderToItemInstance.quantity,
        where: {
          id: OrderToItemInstance.orderId
        }
      })
      res.json(updatedOrder[0][0][0].totalPrice)
    } else {
      res.status(500).send('Adding product failed.')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/remove', async (req, res, next) => {
  try {
    const existingOrderToItem = await OrderToItem.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    let OrderToItemInstance = null
    //Checks to see if the product is currently on this order
    if (existingOrderToItem) {
      if (existingOrderToItem.quantity - req.body.quantity < 0) {
        res.send(
          'Cannot remove more of this product than there is left in the cart.'
        )
      } else {
        //subtracts the new quantity to the current quatity when the product is already on the order
        OrderToItemInstance = await OrderToItem.decrement('quantity', {
          by: req.body.quantity,
          where: {
            orderId: req.body.orderId,
            productId: req.body.productId
          }
        })
      }
    } else {
      //Adds the product to the order with the quantity passed in
      res.status(404).send('Nothing to remove')
    }
    //Checks to see that the OrderToItem instance was either created or its quantity
    //was decreased.
    if (OrderToItemInstance) {
      //If it was we decrease the total price by the new product's price
      //times the amount added.
      OrderToItemInstance = OrderToItemInstance[0][0][0]
      const newProduct = await Product.findByPk(OrderToItemInstance.productId)
      const updatedOrder = await Order.decrement('totalPrice', {
        by: newProduct.price * req.body.quantity,
        where: {
          id: OrderToItemInstance.orderId
        }
      })
      res.json(updatedOrder[0][0][0].totalPrice)
    } else {
      res.status(500).send('Adding product failed.')
    }
  } catch (err) {
    next(err)
  }
})
