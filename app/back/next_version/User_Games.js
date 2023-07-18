import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'User_Games',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      game_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Games',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'User_Games',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'user_id' }, { name: 'game_id' }],
        },
        {
          name: 'game_id',
          using: 'BTREE',
          fields: [{ name: 'game_id' }],
        },
      ],
    }
  );
}
