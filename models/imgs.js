'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Imgs.init(
    {
      bookID: DataTypes.STRING,
      imgID: DataTypes.STRING,
      imgURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Imgs',
      timestamps: false,
    }
  );
  return Imgs;
};
