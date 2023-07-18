import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Rent_Game_Master',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id_renter: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      GameMaster_id_renter: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'GameMasters',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      price: {
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
      tableName: 'Rent_Game_Master',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id_renter',
          using: 'BTREE',
          fields: [{ name: 'user_id_renter' }],
        },
        {
          name: 'GameMaster_id_renter',
          using: 'BTREE',
          fields: [{ name: 'GameMaster_id_renter' }],
        },
      ],
    }
  );
}
