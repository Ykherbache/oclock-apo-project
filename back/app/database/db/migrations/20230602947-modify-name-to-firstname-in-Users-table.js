'use strict';
const config = require('../config/config').production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'name', 'firstname');

    await queryInterface.changeColumn('Users', 'firstname', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'firstname', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.renameColumn('Users', 'firstname', 'name');
  },
};
