'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookID: {
        type: Sequelize.STRING,
      },
      bookname: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      userID: {
        type: Sequelize.STRING,
      },
      discription: {
        type: Sequelize.STRING,
      },
      recordStatus: {
        type: Sequelize.STRING,
      },
      createdTime: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  },
};
