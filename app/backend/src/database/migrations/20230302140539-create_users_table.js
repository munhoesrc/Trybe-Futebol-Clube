'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        alloNull: false,
      },
      username: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      role: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      email: {
        type: Sequelize.STRING,
        alloNull: false,
      },
      password: {
        type: Sequelize.STRING,
        alloNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
