import { DataTypes as dt } from 'sequelize';
export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Rents',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id_owner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      user_game_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Renting_Or_Buying_Games',
          key: 'id',
        },
      },
      user_id_renter: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      beginning_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      late_penalties: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Rents',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id_owner',
          using: 'BTREE',
          fields: [{ name: 'user_id_owner' }],
        },
        {
          name: 'user_game_id',
          using: 'BTREE',
          fields: [{ name: 'user_game_id' }],
        },
        {
          name: 'user_id_renter',
          using: 'BTREE',
          fields: [{ name: 'user_id_renter' }],
        },
      ],
    }
  );
}
