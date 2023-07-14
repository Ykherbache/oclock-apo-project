'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // drop foreign keys in Renting_Or_Buying_Games and User_Games
    await queryInterface.removeConstraint(
      'Renting_Or_Buying_Games',
      'Renting_Or_Buying_Games_ibfk_1'
    );
    await queryInterface.removeConstraint('User_Games', 'User_Games_ibfk_2');

    // change game_id columns in Renting_Or_Buying_Games and User_Games
    await queryInterface.changeColumn('Renting_Or_Buying_Games', 'game_id', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('User_Games', 'game_id', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });

    // change id column in Games
    await queryInterface.changeColumn('Games', 'id', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      autoIncrement: false,
    });

    // re-add foreign keys in Renting_Or_Buying_Games and User_Games
    await queryInterface.addConstraint('Renting_Or_Buying_Games', {
      fields: ['game_id'],
      type: 'foreign key',
      name: 'Renting_Or_Buying_Games_ibfk_1',
      references: {
        table: 'Games',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('User_Games', {
      fields: ['game_id'],
      type: 'foreign key',
      name: 'User_Games_ibfk_2',
      references: {
        table: 'Games',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Here you need to restore the original state of the columns.
    // Adjust this part according to your needs.
  },
};
