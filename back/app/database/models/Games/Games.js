import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Games',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      publisher_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'Publishers',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      mechanics_type_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'Mechanics_Type',
          key: 'id',
        },
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      year_published: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      min_players: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_players: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      playtime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      age_min: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      average_learning_complexity: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      average_strategy_complexity: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      average_note: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      average_price_buy: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      average_price_location: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      upc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Games',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'publisher_id',
          using: 'BTREE',
          fields: [{ name: 'publisher_id' }],
        },
        {
          name: 'category_id',
          using: 'BTREE',
          fields: [{ name: 'category_id' }],
        },
        {
          name: 'mechanics_type_id',
          using: 'BTREE',
          fields: [{ name: 'mechanics_type_id' }],
        },
      ],
    }
  );
}
