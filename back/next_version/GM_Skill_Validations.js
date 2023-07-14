import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'GM_Skill_Validations',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'GameMasters',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      validation_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'GM_Skill_Validations',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'gm_id',
          using: 'BTREE',
          fields: [{ name: 'gm_id' }],
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
