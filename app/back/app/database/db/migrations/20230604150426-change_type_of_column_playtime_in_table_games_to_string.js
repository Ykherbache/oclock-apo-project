'use strict';
const config = require('../config/config').production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      // Modification de la structure de la table Games
      await queryInterface.changeColumn(
        'Games',
        'playtime',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverse migration to change playtime back to integer
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        'Games',
        'playtime',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction }
      );
    });
  },
};
