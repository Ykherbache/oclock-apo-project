export function definePublishersRelations(models) {
  const { publishers, games } = models;
  publishers.hasMany(games, { as: 'Games', foreignKey: 'publisher_id' });
}
