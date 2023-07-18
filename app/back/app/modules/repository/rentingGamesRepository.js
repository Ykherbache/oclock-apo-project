import { Op } from 'sequelize';
import models from '../../database/models/init-models.js';
import { GamesRepository } from './gamesRepository.js';
function processGameObjects(data) {
  data.forEach((item) => {
    const game = item.dataValues.game.dataValues;
    if (game) {
      game['category_name'] = game.category ? game.category.name : 'n/a';
      game['publisher_name'] = game.publisher ? game.publisher.name : 'n/a';
      game['mechanic_name'] = game.mechanics_type
        ? game.mechanics_type.name
        : 'n/a';

      // Optional: delete original objects if not needed
      delete game.category;
      delete game.publisher;
      delete game.mechanics_type;
    }
  });
  return data;
}
export class RentingGamesRepository {
  static rentingOrBuyingGames = models.rentingOrBuyingGames;
  static games = models.games;
  static categories = models.categories;
  static mechanicsType = models.mechanicsType;
  static publishers = models.publishers;
  static users = models.users;
  static rents = models.rents;
  static findGame = async (gameId, ownerId) => {
    return this.rentingOrBuyingGames.findOne({
      where: {
        game_id: gameId,
        owner_id: ownerId,
      },
    });
  };

  static async addRentingGame(gameInfo) {
    const game = await GamesRepository.findGameById(gameInfo.id);
    if (!game) throw new Error("Le jeu spécifié n'existe pas");

    const existingRentingGame = await this.findGame(game.id, gameInfo.ownerId);
    if (existingRentingGame)
      throw new Error('Le jeu spécifié est déjà en location ou à la vente');

    await this.rentingOrBuyingGames.create({
      game_id: game.id,
      owner_id: gameInfo.ownerId,
      price_day_renting: gameInfo.priceDayRenting,
      discount_moreday_renting: gameInfo.discountMoreDayRenting,
      discount_week_renting: gameInfo.discountWeekRenting,
      price_buying: gameInfo.priceBuying,
      caution_price: gameInfo.cautionPrice,
    });

    return 'La location a été ajoutée avec succès';
  }

  static async getRentingGamesByUser({ userId, limit, offset }) {
    const rentingGames = await this.rentingOrBuyingGames.findAndCountAll({
      where: {
        owner_id: userId,
      },
      include: [
        {
          model: this.games,
          as: 'game',
          attributes: ['id', 'name', 'img'],
        },
      ],
      limit,
      offset,
    });

    return {
      totalItems: rentingGames.count,
      currentPage: offset / limit + 1,
      totalPages: Math.ceil(rentingGames.count / limit),
      rentingGames: rentingGames.rows,
    };
  }

  static async listGames({
    page,
    pageSize,
    city,
    category,
    name,
    userId,
    mechanic,
  }) {
    const pageInt = page ? parseInt(page) : 1;
    const pageSizeInt = pageSize ? parseInt(pageSize) : 10;
    const limit = pageSize ? pageSizeInt : 10;
    const offset = page ? (pageInt - 1) * limit : 0;
    let categoryCondition = {};
    if (category) {
      const categoryRes = await this.categories.findOne({
        where: { name: category },
      });
      categoryCondition = { category_id: categoryRes ? categoryRes.id : {} };
    }
    let mechanicCondition = {};
    if (mechanic) {
      const mechanicRes = await this.mechanicsType.findOne({
        where: { name: mechanic },
      });
      mechanicCondition = {
        mechanics_type_id: mechanicRes ? mechanicRes.id : {},
      };
    }

    const { rows, count } = await this.rentingOrBuyingGames.findAndCountAll({
      include: [
        {
          model: this.users,
          as: 'owner',
          where: {
            ...(userId ? { id: { [Op.ne]: `${userId}` } } : {}),
            ...(city ? { city: { [Op.like]: `%${city}%` } } : {}),
          },
          attributes: { exclude: ['password'] },
        },
        {
          model: this.games,
          as: 'game',
          where: {
            ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
            ...categoryCondition,
            ...mechanicCondition,
          },
          include: [
            {
              model: this.mechanicsType,
              as: 'mechanics_type',
            },
            {
              model: this.publishers,
              as: 'publisher',
            },
            {
              model: this.categories,
              as: 'category',
            },
          ],
        },
        {
          model: this.rents,
          as: 'Rents',
          where: {
            [Op.or]: [
              { status: { [Op.notIn]: ['reserved', 'rented'] } },
              { id: { [Op.is]: null } },
            ],
          },
          required: false,
        },
      ],
      attributes: ['id', 'price_Day_Renting'],
      order: [['price_day_renting', 'ASC']],
      limit: limit,
      offset: offset,
    });
    let rentGames = processGameObjects(rows);

    rentGames = rentGames.filter((rentGame) => {
      return !rentGame.Rents.some(
        (rent) => rent.status === 'reserved' || rent.status === 'rented'
      );
    });

    rentGames = await Promise.all(
      rentGames.map(async (gameResponse) => {
        const rent = await this.rents.findOne({
          where: {
            user_game_id: gameResponse.id,
            status: { [Op.or]: ['reserved', 'rented'] },
          },
        });

        if (rent) {
          return null;
        }

        return gameResponse;
      })
    );
    function isDefined(value) {
      return value !== null && value !== undefined;
    }

    rentGames = rentGames.map((gameResponse) => {
      if (
        isDefined(userId) &&
        isDefined(gameResponse?.owner?.id) &&
        parseInt(gameResponse?.owner?.id) !== parseInt(userId)
      ) {
        return null;
      }

      return gameResponse;
    });
    rentGames = rentGames.filter((gameResponse) => gameResponse !== null);

    return {
      totalItems: count,
      currentPage: pageInt,
      pageSize: pageSize,
      totalPages: Math.ceil(count / pageSizeInt),
      games: rentGames,
    };
  }

  static async getRentingGameById(id) {
    return this.rentingOrBuyingGames.findOne({
      where: { id },
      include: [
        {
          model: this.games,
          as: 'game',
          attributes: [
            'id',
            'img',
            'name',
            'publisher_id',
            'description',
            'category_id',
            'mechanics_type_id',
            'price',
            'year_published',
            'min_players',
            'max_players',
            'playtime',
            'age_min',
            'average_learning_complexity',
            'average_strategy_complexity',
            'average_note',
            'average_price_buy',
            'average_price_location',
            'upc',
          ],
        },
        {
          model: this.users,
          as: 'owner',
          attributes: [
            'id',
            'firstname',
            'lastname',
            'email',
            'city',
            'pseudo',
          ],
        },
      ],
    });
  }

  static async getBestGameRenting({ gameId, userId }) {
    let rentingGames = await this.rentingOrBuyingGames.findAll({
      where: {
        game_id: gameId,
        owner_id: { [Op.ne]: userId },
      },
      order: [['price_day_renting', 'ASC']],
      include: [
        {
          model: models.games,
          as: 'game',
          include: [
            {
              model: this.mechanicsType,
              as: 'mechanics_type',
            },
            {
              model: this.publishers,
              as: 'publisher',
            },
            {
              model: this.categories,
              as: 'category',
            },
          ],
        },
        {
          model: models.users,
          as: 'owner',
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: models.rents,
          as: 'Rents',
          where: {
            [Op.or]: [
              { status: { [Op.notIn]: ['reserved', 'rented'] } },
              { id: { [Op.is]: null } }, // This will match rentingOrBuyingGames with no associated rents
            ],
          },
          required: false,
        },
      ],
    });
    return processGameObjects(rentingGames);
  }
}
