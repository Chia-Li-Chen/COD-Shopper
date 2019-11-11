const router = require('express').Router()
const session = require('express-session')

// const isAdminMiddleware = (req, res, next) => {
//   const currentUser = req.user
//   if (currentUser && currentUser.isAdmin) {
//     next()
//   } else {
//   }
//   const error = new Error('You are not authorized to perform that task!')
//   error.status = 401
//   next(error)

module.exports = router

router.use(
  session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: process.env.EXPRESS_SESSION_SECRET, // or whatever you like
    // this option says if you haven't changed anything, don't resave. It is recommended and reduces session concurrency issues
    resave: false,
    // this option says if I am new but not modified still save
    saveUninitialized: true
  })
)

router.use((req, res, next) => {
  console.log('SESSION: ', req.session)
  next()
})

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
