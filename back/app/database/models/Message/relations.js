export function defineMessageRelations(models) {
  const { message, users } = models;
  message.belongsTo(users, { as: 'sender', foreignKey: 'sender_id' });
  message.belongsTo(users, { as: 'receiver', foreignKey: 'receiver_id' });
}
