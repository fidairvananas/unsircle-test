const router = require('express').Router();
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const companyRouter = require('./companyRouter')

router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/companies', companyRouter)

module.exports = router