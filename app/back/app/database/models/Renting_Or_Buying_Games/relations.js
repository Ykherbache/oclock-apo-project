export function defineRentingOrBuyingGamesRelations(models) {
  const { rentingOrBuyingGames, games, rents, users } = models;

  rentingOrBuyingGames.belongsTo(games, {
    as: 'game',
    foreignKey: 'game_id',
  });

  rentingOrBuyingGames.hasMany(rents, {
    as: 'Rents',
    foreignKey: 'user_game_id',
  });

  rentingOrBuyingGames.belongsTo(users, {
    as: 'owner',
    foreignKey: 'owner_id',
  });
}
