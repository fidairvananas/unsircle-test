const {User} = require('../models')
const {comparePassword} = require('../helpers/hashPass')
const {signToken} = require('../helpers/jwt')

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

module.exports = {
  UserController
}
