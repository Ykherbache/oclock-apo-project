Evaluation.belongsTo(GameMasters, {
  as: 'game_master',
  foreignKey: 'game_master_id',
});
GameMasters.hasMany(Evaluation, {
  as: 'Evaluations',
  foreignKey: 'game_master_id',
});
GM_Skill_Validations.belongsTo(GameMasters, {
  as: 'gm',
  foreignKey: 'gm_id',
});
GameMasters.hasMany(GM_Skill_Validations, {
  as: 'GM_Skill_Validations',
  foreignKey: 'gm_id',
});
GM_Skills.belongsTo(GameMasters, { as: 'gm', foreignKey: 'gm_id' });
GameMasters.hasOne(GM_Skills, { as: 'GM_Skill', foreignKey: 'gm_id' });
Rent_Game_Master.belongsTo(GameMasters, {
  as: 'GameMaster_id_renter_GameMaster',
  foreignKey: 'GameMaster_id_renter',
});
GameMasters.hasMany(Rent_Game_Master, {
  as: 'Rent_Game_Masters',
  foreignKey: 'GameMaster_id_renter',
});
User_Games.belongsTo(Games, { as: 'game', foreignKey: 'game_id' });
Availability.belongsTo(Renting_Or_Buying_Games, {
  as: 'renting_or_buying_game',
  foreignKey: 'renting_or_buying_game_id',
});
Games.hasMany(User_Games, { as: 'User_Games', foreignKey: 'game_id' });

Rents.hasMany(Evaluation, { as: 'Evaluations', foreignKey: 'renter_id' });
Evaluation.belongsTo(Rents, { as: 'renter', foreignKey: 'renter_id' });
Evaluation.belongsTo(Users, {
  as: 'user_id_evaluator_User',
  foreignKey: 'user_id_evaluator',
});
Users.hasMany(Evaluation, {
  as: 'Evaluations',
  foreignKey: 'user_id_evaluator',
});
GM_Skill_Validations.belongsTo(Users, { as: 'user', foreignKey: 'user_id' });
Users.hasMany(GM_Skill_Validations, {
  as: 'GM_Skill_Validations',
  foreignKey: 'user_id',
});
GameMasters.belongsTo(Users, { as: 'user', foreignKey: 'user_id' });
Users.hasMany(GameMasters, { as: 'GameMasters', foreignKey: 'user_id' });
Rent_Game_Master.belongsTo(Users, {
  as: 'user_id_renter_User',
  foreignKey: 'user_id_renter',
});
User_Games.belongsTo(Users, { as: 'user', foreignKey: 'user_id' });
export default function defineGameRelations(models) {
  const { Games, Users, User_Games, Categories, Mechanics_Type, Publishers } =
    models;

  Games.belongsToMany(Users, {
    as: 'user_id_Users',
    through: User_Games,
    foreignKey: 'game_id',
    otherKey: 'user_id',
  });
  //... rest of the relationships
}

Games.belongsToMany(Users, {
  as: 'user_id_Users',
  through: User_Games,
  foreignKey: 'game_id',
  otherKey: 'user_id',
});
Users.belongsToMany(Games, {
  as: 'game_id_Games',
  through: User_Games,
  foreignKey: 'user_id',
  otherKey: 'game_id',
});

Users.hasMany(User_Games, { as: 'User_Games', foreignKey: 'user_id' });

Users.hasMany(Rent_Game_Master, {
  as: 'Rent_Game_Masters',
  foreignKey: 'user_id_renter',
});
