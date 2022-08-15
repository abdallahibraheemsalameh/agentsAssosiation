'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Readers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Readers.init(
    {
      ownername: DataTypes.STRING,
      age: DataTypes.INTEGER,
      _id: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      location: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Readers',
      timestamps: false,
    }
  );
  return Readers;
};
