'use strict';
const config = require('../config/config').production;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      // Suppression de la clé étrangère publisher_id dans la table Games
      await queryInterface.removeConstraint('Games', 'Games_ibfk_1', {
        transaction,
      });

      // Modification de la structure de la table Publishers
      await queryInterface.changeColumn(
        'Publishers',
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
        'publisher_id',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );

      // Ajout de la clé étrangère publisher_id dans la table Games
      await queryInterface.addConstraint(
        'Games',
        {
          fields: ['publisher_id'],
          type: 'foreign key',
          name: 'Games_ibfk_1',
          references: {
            //Required field
            table: 'Publishers',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        { transaction }
      );
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Si nécessaire, écrivez la migration de suppression ici
  },
};
