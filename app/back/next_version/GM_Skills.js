import { DataTypes as dt } from 'sequelize';

export default function (sequelize, DataTypes = dt) {
  return sequelize.define(
    'GM_Skills',
    {
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'GameMasters',
          key: 'id',
        },
      },
      reactivity: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      communication: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      creativity: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      rigor: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      dynamic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      smiling: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Rules_Knowledge: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Games_knowledge: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Player_mediation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Empathy: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Respectful: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Story_World_Building: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Debriefing_Quality: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Preparation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Adaptation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      LGBTQA_Friendly: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'GM_Skills',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'gm_id' }],
        },
      ],
    }
  );
}
