const router = require('express').Router()
const {Product, OrderToItem, Order} = require('../db/models/models_index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findAll({
      where: {
        id: req.params.id
      }
    })
    // console.log('Single product:', singleProduct)
    if (singleProduct.length) {
      res.status(200).json(singleProduct)
    } else {
      res.status(404).send('No product with that ID!')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

//Get the products for an existing order
router.get('/:orderId/getProducts', async (req, res, next) => {
  try {
    console.log('The req params is', req.params, 'the body is', req.body)
    const orderProducts = await Order.findAll({
      include: [
        {
          model: Product,
          through: {where: {orderId: req.params.orderId}}
        }
      ]
    })
    console.log('<<<<<<<<<<these are the order products: ', orderProducts)
    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})
