'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } =require('../helpers/hashPass')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};