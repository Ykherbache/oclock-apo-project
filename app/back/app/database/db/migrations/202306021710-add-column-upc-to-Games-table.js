'use strict';
const config = require('../config/config').production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      {
        tableName: 'Games',
        schema: config.schema,
      },
      'upc',
      {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
      {
        tableName: 'Games',
        schema: config.schema,
      },
      'upc'
    );
  },
};
