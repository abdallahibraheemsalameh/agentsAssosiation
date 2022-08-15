'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Owners.init(
    {
      ownername: DataTypes.STRING,
      ownerID: DataTypes.STRING,
      bookID: DataTypes.STRING,
      readerID: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      location: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      age: DataTypes.INTEGER,
      recordStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Owners',
      timestamps: false,
    }
  );
  return Owners;
};
