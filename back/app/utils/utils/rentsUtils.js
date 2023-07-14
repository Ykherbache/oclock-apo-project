import models from '../../database/models/init-models.js';

export const enrichRentsWithAssociatedInfo = async (rents) => {
  const { rentingOrBuyingGames, games, users } = models;
  return Promise.all(
    rents.map(async (rent) => {
      const rentingGame = await rentingOrBuyingGames.findOne({
        where: {
          id: rent.user_game_id,
        },
        attributes: ['game_id'],
        include: [
          {
            model: games,
            as: 'game',
            attributes: [
              'id',
              'name',
              'img',
              'min_players',
              'max_players',
              'age_min',
            ],
          },
        ],
      });
      const associatedGame = rentingGame ? rentingGame.game : null;

      const associatedUser = await users.findOne({
        where: {
          id: rent.user_id_renter,
        },
        attributes: ['id', 'pseudo', 'email', 'img', 'city'],
      });
      return {
        ...rent.toJSON(),
        associatedGame,
        associatedUser,
      };
    })
  );
};
