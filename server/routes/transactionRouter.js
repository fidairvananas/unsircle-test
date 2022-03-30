const transactionRouter = require('express').Router();
const {TransactionController} = require('../controllers')

transactionRouter.post('/', TransactionController.createTransaction)
transactionRouter.get('/', TransactionController.getTransaction)
transactionRouter.put('/:id', TransactionController.editTransaction)
transactionRouter.delete('/:id', TransactionController.deleteTransaction)

module.exports = transactionRouter