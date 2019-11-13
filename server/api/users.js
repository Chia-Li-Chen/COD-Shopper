const router = require('express').Router()
const {User} = require('../db/models/models_index')
module.exports = router

// const isAdminMiddleware = (req, res, next) => {
//   const currentUser = req.user
//   if (currentUser) {
//     next()
//   } else {
//     const error = new Error('Unauthorized')
//     error.status = 401
//     next(error)
//   }
// }

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//ONK - Route to add new users to the database from create-account form
router.post('/add', async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})
