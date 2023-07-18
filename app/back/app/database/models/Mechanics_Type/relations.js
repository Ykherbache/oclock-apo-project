export function defineMechanicTypeRelations(models) {
  const { mechanicsType, games } = models;
  mechanicsType.hasMany(games, {
    as: 'Games',
    foreignKey: 'mechanics_type_id',
  });
}
