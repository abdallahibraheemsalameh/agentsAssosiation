'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Books.init(
    {
      userID: DataTypes.STRING,
      bookID: DataTypes.STRING,
      bookname: DataTypes.STRING,
      author: DataTypes.STRING,
      discription: DataTypes.STRING,
      recordStatus: DataTypes.STRING,
      createdTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Books',
      timestamps: false,
    }
  );
  return Books;
};
