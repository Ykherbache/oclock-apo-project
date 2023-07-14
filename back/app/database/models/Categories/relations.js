export function defineCategoriesRelations(models) {
  const { categories, games } = models;

  categories.hasMany(games, { as: 'Games', foreignKey: 'category_id' });
}
