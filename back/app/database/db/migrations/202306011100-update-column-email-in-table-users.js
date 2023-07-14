'use strict';
const config = require('../config/config').production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction((t) => {
      return queryInterface.sequelize.query(
        `UPDATE Users SET email = 'default@example.com' WHERE email IS NULL`,
        { transaction: t }
      );
    });

    return queryInterface.changeColumn(
      {
        tableName: 'Users',
      },
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, write the down migration here
  },
};
