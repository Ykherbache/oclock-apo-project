'use strict';
const config = require('../config/config').production;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'Message',
        schema: config.schema,
      },
      'read_message',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    );
    return queryInterface.addColumn(
      {
        tableName: 'Message',
        schema: config.schema,
      },
      'object',
      {
        type: Sequelize.STRING(255),
        allowNull: false,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.removeColumn(
      {
        tableName: 'Message',
        schema: config.schema,
      },
      'read_message'
    );
    return queryInterface.removeColumn(
      {
        tableName: 'Message',
        schema: config.schema,
      },
      'object'
    );
  },
};
