const router = require('express').Router()
const {Product, Order} = require('../db/models/models_index')

module.exports = router

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'imageUrl', 'price', 'description']
    })

    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findAll({
      attributes: ['id', 'name', 'imageUrl', 'price', 'description'],
      where: {
        id: req.params.id
      }
    })
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
router.get(
  '/:orderId/getProducts',
  isAdminMiddleware,
  async (req, res, next) => {
    try {
      // console.log('The req params is', req.params, 'the body is', req.body)
      const orderProducts = await Order.findAll({
        where: {id: req.params.orderId},
        include: [
          {
            model: Product,
            through: {where: {orderId: req.params.orderId}}
          }
        ]
      })
      res.json(orderProducts)
    } catch (err) {
      next(err)
    }
  }
)

// ******Test route for isAdminMiddleware*****
// router.delete('/:id', isAdminMiddleware, async (req, res, next) => {
//   try {
//     const singleProduct = await Product.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     if (singleProduct.length) {
//       res.status(200).json(singleProduct)
//     } else {
//       res.status(404).send('No product with that ID!')
//     }
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// })
