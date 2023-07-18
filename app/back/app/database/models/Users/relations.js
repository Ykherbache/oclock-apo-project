export function defineUsersRelations(models) {
  const { users, message, rentingOrBuyingGames, rents } = models;

  users.hasMany(message, { as: 'Messages', foreignKey: 'sender_id' });

  users.hasMany(message, {
    as: 'receiver_Messages',
    foreignKey: 'receiver_id',
  });

  users.hasMany(rentingOrBuyingGames, {
    as: 'Renting_Or_Buying_Games',
    foreignKey: 'owner_id',
  });

  users.hasMany(rents, { as: 'Rents', foreignKey: 'user_id_owner' });

  users.hasMany(rents, {
    as: 'user_id_renter_Rents',
    foreignKey: 'user_id_renter',
  });
}
