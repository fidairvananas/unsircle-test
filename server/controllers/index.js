const {User, Product, Company} = require('../models')
const {comparePassword} = require('../helpers/hashPass')
const {signToken} = require('../helpers/jwt');

class UserController {
  static async register(req, res, next){
    try {
      console.log(User);
      const { name, email, password, phoneNumber} = req.body
      console.log(name, email);
      const result = await User.create({
        name,
        email,
        password,
        phoneNumber
      })
      res.status(200).json({message: 'Register success', email: result.email})
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next){
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (user) {
        const checkPass = comparePassword(password, user.password)
        if (checkPass) {
          const payload = {id: user.id, email:user.email}
          const access_token = signToken(payload)
          res.status(200).json({message: "Login successfull!", access_token})
        } else {
          throw {
            code: 401,
            name: 'Unauthorized',
            message: 'Invalid email or password'
          }
        }
      } else {
        throw {
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email or password'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

class ProductController {
  static async createProduct(req, res, next){
    try {
      const { name, description, imageUrl, CompanyId } = req.body
      const result = await Product.create({
        name,
        description,
        imageUrl,
        CompanyId
      })
      res.status(200).json({message:'Create product success', data: result})
    } catch (error) {
      next(error)
    }
  }


  static async getAllProduct(req, res, next){
    try {
      const result = await Product.findAll()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async editProduct(req, res, next){
    try {
      const { id } = req.params
      const { name, description, imageUrl, CompanyId } = req.body

      const find = await Product.findByPk(id)
      if (find) {
        const result = await Product.update({
          name,
          description,
          imageUrl,
          CompanyId
        }, {
          where: {
            id: id
          },
          returning: true
        })

        res.status(200).json({message: 'Update product success', data: result[1][0]})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Product not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req, res, next){
    try {
      const { id } = req.params
      const find = await Product.findByPk(id)
      if (find) {
        await Product.destroy({
          where: {
            id: id
          }
        })

        res.status(200).json({message: 'Product success deleted'})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Product not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

class CompanyController {
  static async createCompany(req, res, next){
    try {
      const { name, directorName, bussinesField, address} = req.body
      const result = await Company.create({
        name,
        directorName,
        bussinesField,
        address
      })
      res.status(200).json({message: 'Create company success', data:result})
    } catch (error) {
      next(error)
    }
  }

  static async getAllCompany(req, res, next){
    try {
      const result = await Company.findAll()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async editCompany(req, res, next){
    try {
      const { id } = req.params
      const { name, directorName, bussinesField, address } = req.body

      const find = await Company.findByPk(id)
      if (find) {
        const result = await Company.update({
          name,
          directorName,
          bussinesField,
          address
        }, {
          where: {
            id: id
          },
          returning: true
        })

        res.status(200).json({message: 'Update product success', data: result[1][0]})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Company not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }


  static async deleteCompany(req, res, next){
    try {
      const { id } = req.params
      const find = await Company.findByPk(id)
      if (find) {
        await Company.destroy({
          where: {
            id: id
          }
        })

        res.status(200).json({message: 'Company success deleted'})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Company not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  UserController,
  ProductController,
  CompanyController
}
