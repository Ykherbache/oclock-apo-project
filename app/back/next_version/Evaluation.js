import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Evaluation',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id_evaluator: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      game_master_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'GameMasters',
          key: 'id',
        },
      },
      renter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Rents',
          key: 'id',
        },
      },
      note_gm: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      note_rent: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      comments: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Evaluation',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id_evaluator',
          using: 'BTREE',
          fields: [{ name: 'user_id_evaluator' }],
        },
        {
          name: 'game_master_id',
          using: 'BTREE',
          fields: [{ name: 'game_master_id' }],
        },
        {
          name: 'renter_id',
          using: 'BTREE',
          fields: [{ name: 'renter_id' }],
        },
      ],
    }
  );
}
