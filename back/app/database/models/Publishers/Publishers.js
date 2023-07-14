import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Publishers',
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Publishers',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
}
