const companyRouter = require('express').Router();
const {CompanyController} = require('../controllers')

companyRouter.post('/', CompanyController.createCompany)
companyRouter.get('/', CompanyController.getAllCompany)
companyRouter.put('/:id', CompanyController.editCompany)
companyRouter.delete('/:id', CompanyController.deleteCompany)

module.exports = companyRouter