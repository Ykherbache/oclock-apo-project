import { DataTypes as dt, Sequelize } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      object: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      message_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sent_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      read_message: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'Message',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'sender_id',
          using: 'BTREE',
          fields: [{ name: 'sender_id' }],
        },
        {
          name: 'receiver_id',
          using: 'BTREE',
          fields: [{ name: 'receiver_id' }],
        },
      ],
    }
  );
}
