import { RentRepository } from '../repository/rentsRepository.js';
import { UserRepository } from '../repository/userRepository.js';
import { GamesRepository } from '../repository/gamesRepository.js';
import { RentingGamesRepository } from '../repository/rentingGamesRepository.js';

export class RentService {
  static async getRentsByOwnerId(user_id, page, limit, status) {
    return await RentRepository.findAndCountAllByOwner(
      user_id,
      page,
      limit,
      status
    );
  }
  static async getRentsByRenterId(user_id, page, limit, status) {
    return await RentRepository.findAndCountAllByRenter(
      user_id,
      page,
      limit,
      status
    );
  }
  static async createRent({
    game_id,
    owner_id,
    rental_game_id,
    beginning_date,
    renter_id,
    status,
    price,
  }) {
    console.log({
      game_id,
      owner_id,
      rental_game_id,
      beginning_date,
      renter_id,
      status,
      price,
    });

    const rentalGame = await RentingGamesRepository.findGame(game_id, owner_id);

    if (!rentalGame) {
      throw new Error('Jeu et propriétaire non trouvés');
    }

    const checkRent = await RentRepository.findOne(rental_game_id, [
      'reserved',
      'rented',
    ]);

    if (checkRent) {
      throw new Error('Jeu déjà loué');
    }

    const rent = await RentRepository.create({
      beginning_date,
      user_id_owner: owner_id,
      user_id_renter: renter_id,
      user_game_id: rental_game_id,
      status,
      price,
    });

    const game = await GamesRepository.findGameById(game_id);
    const renter = await UserRepository.findUserById(renter_id);
    const owner = await UserRepository.findUserById(owner_id);

    return { rent, game, renter, owner };
  }

  static async updateRentStatus(rent_id, user_id, status) {
    const rent = await RentRepository.findOneById(rent_id);
    if (!rent || String(rent.user_id_owner) !== String(user_id)) {
      throw new Error('Invalid rent or user');
    }

    return await RentRepository.updateStatus(rent_id, status);
  }

  static async deleteRentByOwner(rent_id, user_id) {
    const rent = await RentRepository.findOneByIdAndOwnerId(rent_id, user_id);

    if (!rent) {
      throw new Error('Invalid rent or user');
    }

    return await RentRepository.deleteById(rent_id);
  }
  static async deleteRentByRenter(rent_id, user_id) {
    const rent = await RentRepository.findOneByIdAndRenterId(rent_id, user_id);

    if (!rent) {
      throw new Error('Invalid rent or user');
    }

    return await RentRepository.deleteById(rent_id);
  }
}
