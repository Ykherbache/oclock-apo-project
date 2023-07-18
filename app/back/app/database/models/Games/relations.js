export function defineGamesRelations(models) {
  const { categories, games, rentingOrBuyingGames, mechanicsType, publishers } =
    models;

  games.belongsTo(categories, { as: 'category', foreignKey: 'category_id' });

  games.hasMany(rentingOrBuyingGames, {
    as: 'Renting_Or_Buying_Games',
    foreignKey: 'game_id',
  });

  games.belongsTo(mechanicsType, {
    as: 'mechanics_type',
    foreignKey: 'mechanics_type_id',
  });

  games.belongsTo(publishers, { as: 'publisher', foreignKey: 'publisher_id' });
}
