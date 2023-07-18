'use strict';
const config = require('../config/config').production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      {
        tableName: 'Users',
        schema: config.schema,
      },
      'pseudo',
      {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      }
    );
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
      {
        tableName: 'Users',
        schema: config.schema,
      },
      'pseudo'
    );
  },
};
