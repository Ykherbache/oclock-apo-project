'use strict';
const config = require('../config/config').production;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      // Suppression de la clé étrangère category_id dans la table Games
      await queryInterface.sequelize.query(
        'ALTER TABLE `Games` DROP FOREIGN KEY `Games_ibfk_2`;',
        { transaction }
      );

      // Modification de la table Categories
      await queryInterface.sequelize.query(
        `UPDATE Categories SET id = 'unknown' WHERE id IS NULL`,
        { transaction }
      );

      // Modification de la structure de la table Categories
      await queryInterface.changeColumn(
        'Categories',
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
        'category_id',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      // Ajout de la clé étrangère category_id dans la table Games
      await queryInterface.sequelize.query(
        'ALTER TABLE `Games` ADD CONSTRAINT `Games_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`);',
        { transaction }
      );
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Si nécessaire, écrivez la migration de suppression ici
  },
};
