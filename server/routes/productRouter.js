const productRouter = require('express').Router();
const {ProductController} = require('../controllers')

productRouter.post('/', ProductController.createProduct)
productRouter.get('/', ProductController.getAllProduct)
productRouter.put('/:id', ProductController.editProduct)
productRouter.delete('/:id', ProductController.deleteProduct)

module.exports = productRouter