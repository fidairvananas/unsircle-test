'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Product, {foreignKey: 'ProductId'})
      Transaction.belongsTo(models.Company, {foreignKey: 'CompanyId'})
    }
  }
  Transaction.init({
    orderNumber: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    total: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};