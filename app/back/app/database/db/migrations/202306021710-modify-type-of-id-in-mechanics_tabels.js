'use strict';
const config = require('../config/config').production;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      // Suppression de la clé étrangère category_id dans la table Games
      await queryInterface.sequelize.query(
        'ALTER TABLE `Games` DROP FOREIGN KEY `Games_ibfk_3`;',
        { transaction }
      );

      // Modification de la structure de la table Categories
      await queryInterface.changeColumn(
        'Mechanics_Type',
        'id',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      // Modification de la structure de la table Games
      await queryInterface.changeColumn(
        'Games',
        'mechanics_type_id',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      // Ajout de la clé étrangère category_id dans la table Games
      await queryInterface.sequelize.query(
        'ALTER TABLE `Games` ADD CONSTRAINT `Games_ibfk_3` FOREIGN KEY (`mechanics_type_id`) REFERENCES `Mechanics_Type` (`id`);',
        { transaction }
      );
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Si nécessaire, écrivez la migration de suppression ici
  },
};
