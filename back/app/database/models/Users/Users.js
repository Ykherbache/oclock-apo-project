import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: `${process.env.back_url}/uploads/avatar02062202.png`,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isLoggedIn: {
        type: DataTypes.TINYINT(String(1)),
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'Users',
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
