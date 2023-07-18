import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'GameMasters',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      imgs_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      presentation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      note: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      category_game_specialities: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      game_propositions: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      videos: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      prestations: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'GameMasters',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  );
}
