import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Availability',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      renting_or_buying_game_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Renting_Or_Buying_Games',
          key: 'id',
        },
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Availability',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'renting_or_buying_game_id',
          using: 'BTREE',
          fields: [{ name: 'renting_or_buying_game_id' }],
        },
      ],
    }
  );
}
