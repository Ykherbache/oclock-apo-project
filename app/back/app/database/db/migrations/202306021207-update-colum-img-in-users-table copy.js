'use strict';
require('dotenv').config();

export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.sequelize.query(
      `UPDATE Users SET img = '${process.env.back_url}/uploads/avatar02062202.png' WHERE img IS NULL`,
      { transaction: t }
    );
  });

  return queryInterface.changeColumn('Users', 'img', {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: `${process.env.back_url}/uploads/avatar02062202.png`,
  });
}
export async function down(queryInterface, Sequelize) {
  // If needed, write the down migration here
}
