const router = require('express').Router();
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const companyRouter = require('./companyRouter')
const transactionRouter = require('./transactionRouter')

router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/companies', companyRouter)
router.use('/transactions', transactionRouter)

module.exports = router