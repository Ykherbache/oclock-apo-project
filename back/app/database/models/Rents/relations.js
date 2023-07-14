export function defineRentsRelations(models) {
  const { rents, users, rentingOrBuyingGames } = models;

  rents.belongsTo(rentingOrBuyingGames, {
    as: 'user_game',
    foreignKey: 'user_game_id',
  });
  rents.belongsTo(users, {
    as: 'user_id_owner_User',
    foreignKey: 'user_id_owner',
  });
  rents.belongsTo(users, {
    as: 'user_id_renter_User',
    foreignKey: 'user_id_renter',
  });
}
