import { expect, jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryRentsPath =
  '../../../app/modules/repository/rentsRepository.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryUserPath = '../../../app/modules/repository/userRepository.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryGamesPath =
  '../../../app/modules/repository/gamesRepository.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryRentingGamesPath =
  '../../../app/modules/repository/rentingGamesRepository.js';

/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/rentsService.js';
/**
 * Mocks the repository module.
 */

jest.unstable_mockModule(repositoryRentsPath, () => ({
  RentRepository: {
    findOne: jest.fn(),
    findOneById: jest.fn(),
    findOneByIdAndOwnerId: jest.fn(),
    findOneByIdAndRenterId: jest.fn(),
    findAndCountAllByOwner: jest.fn(),
    findAndCountAllByRenter: jest.fn(),
    create: jest.fn(),
    updateStatus: jest.fn(),
    deleteById: jest.fn(),
  },
}));

jest.unstable_mockModule(repositoryGamesPath, () => ({
  GamesRepository: {
    findGameById: jest.fn(),
  },
}));

jest.unstable_mockModule(repositoryRentingGamesPath, () => ({
  RentingGamesRepository: {
    findOne: jest.fn(),
  },
}));

jest.unstable_mockModule(repositoryUserPath, () => ({
  UserRepository: {
    findUserById: jest.fn(),
  },
}));

/**
 * The mocked repository module.
 * @type {{RentRepository: {
 * findOne: Function,
 * findOneById: Function,
 * findOneByIdAndOwnerId: Function,
 * findOneByIdAndRenterId: Function,
 * findAndCountAllByOwner: Function,
 * findAndCountAllByRenter: Function,
 * create: Function,
 * updateStatus: Function,
 * deleteById: Function,
 * }}}
 */
const mockRepositoryRents = await import(repositoryRentsPath);

/**
 * The mocked repository module.
 * @type {{UserRepository: {
 * findUserById: Function,
 * }}}
 */
const mockRepositoryUser = await import(repositoryUserPath);
/**
 * The mocked repository module.
 * @type {{GamesRepository: {
 * findGameById: Function,
 * }}}
 */
const mockRepositoryGames = await import(repositoryGamesPath);
/**
 * The mocked repository module.
 * @type {{RentingGamesRepository: {
 * findOne: Function,
 * }}}
 */
const mockRepositoryRentingGames = await import(repositoryRentingGamesPath);

/**
 * The mocked repository module.
 * @type {{
 * RentService: {
 * getRentsByOwnerId: Function,
 * getRentsByRenterId: Function,
 * createRent: Function,
 * updateRentStatus: Function,
 * deleteRentByOwner: Function,
 * deleteRentByRenter: Function,
 *}}}
 */
const { RentService } = await import(servicePath);

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should check that getRentsByOwnerId calls findAndCountAllByOwner and returns it's data", async () => {
    const returnData = {
      rows: [
        {
          id: 5,
          user_id_owner: 7,
          user_game_id: 11,
          user_id_renter: 9,
          beginning_date: '2023-07-04',
          return_date: null,
          price: '3.00',
          late_penalties: null,
          status: 'reserved',
        },
      ],
      count: 1,
    };

    // @ts-ignore
    mockRepositoryRents.RentRepository.findAndCountAllByOwner.mockResolvedValue(
      returnData
    );

    const result = await RentService.getRentsByOwnerId(
      '7',
      '1',
      '5',
      'reserved'
    );
    expect(result).toEqual(returnData);

    expect(
      await mockRepositoryRents.RentRepository.findAndCountAllByOwner
    ).toHaveBeenCalledWith('7', '1', '5', 'reserved');

    expect(
      await mockRepositoryRents.RentRepository.findAndCountAllByOwner
    ).toHaveBeenCalledTimes(1);
  });
});

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that checks that the getRentsByRenterId method calls the findAndCountAllByRenter method and returns its data.
   * @return {Promise<void>}
   * @test {RentService#getRentsByRenterId}
   * 1. Call the getRentsByRenterId method
   * 2. Check that the findAndCountAllByRenter method has been called
   * 3. Check that the findAndCountAllByRenter method has been called only once
   * 4. Check that the findAndCountAllByRenter method has been called with the correct parameters
   * 5. Check that the method returns the correct data
   * 6. Check that the method returns the correct data type
   * 7. Check that the method throws an error if the findAndCountAllByRenter method throws an error
   */
  
  it('should check that getRentsByRenterId calls findAndCountAllByRenter and returns its data', async () => {
    const returnData = {
      rows: [
        {
          id: 31,
          user_id_owner: 35,
          user_game_id: 31,
          user_id_renter: 36,
          beginning_date: '2023-07-02',
          return_date: null,
          price: '1.50',
          late_penalties: null,
          status: 'reserved',
          associatedGame: {
            id: 'qldTKcD0cH',
            name: 'Magic Maze on Mars',
            img: 'https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1573495733700',
            min_players: 1,
            max_players: 6,
            age_min: 7,
          },
          associatedUser: {
            id: 36,
            pseudo: 'ThePeintre',
            email: 'licorne29@gmail.com',
            img: 'http://localhost:8080/uploads/ThePeintre/Licorne_qui_pleure.png',
            city: 'Marseille',
          },
        },
      ],
      count: 1,
    };

    mockRepositoryRents.RentRepository.findAndCountAllByRenter.mockResolvedValue(
      returnData
    );

    const result = await RentService.getRentsByRenterId(
      '36',
      '1',
      '5',
      'reserved'
    );

    expect(result).toEqual(returnData);

    expect(
      mockRepositoryRents.RentRepository.findAndCountAllByRenter
    ).toHaveBeenCalledWith('36', '1', '5', 'reserved');
    expect(
      mockRepositoryRents.RentRepository.findAndCountAllByRenter
    ).toHaveBeenCalledTimes(1);
  });

  /**
   * Test that the updateRentStatus method updates the rent status and returns true
   * mock the RentRepository.findOneById method to return the expected rent
   * mock the RentRepository.updateStatus method to return true
   * call the updateRentStatus method with the expected parameters
   * expect the RentRepository.findOneById method to have been called with the expected parameters
   * expect the RentRepository.updateStatus method to have been called with the expected parameters
    */
  it('should update the rent status and return true', async () => {
    const rentId = '123';
    const userId = '456';
    const status = 'completed';

    const expectedUpdatedRent = {
      id: rentId,
      user_id_owner: userId,
      status: status,
    };

    mockRepositoryRents.RentRepository.findOneById.mockResolvedValue(
      expectedUpdatedRent
    );
    mockRepositoryRents.RentRepository.updateStatus.mockResolvedValue(true);

    const result = await RentService.updateRentStatus(rentId, userId, status);

    expect(result).toBe(true);
    expect(mockRepositoryRents.RentRepository.findOneById).toHaveBeenCalledWith(
      rentId
    );
    expect(
      mockRepositoryRents.RentRepository.updateStatus
    ).toHaveBeenCalledWith(rentId, status);
  });

  /**
   * Test that the updateRentStatus method throws an error for an invalid rent
   * mock the RentRepository.findOneById method to return null
   * call the updateRentStatus method with the expected parameters
   * expect the RentRepository.findOneById method to have been called with the expected parameters
   */

  it('should throw an error for an invalid user', async () => {
    const rentId = '123'; // rent ID
    const userId = '456'; // user ID
    const status = 'completed';

    const rentData = {
      id: rentId,
      user_id_owner: '789',
    };

    mockRepositoryRents.RentRepository.findOneById.mockResolvedValue(rentData);

    await expect(
      RentService.updateRentStatus(rentId, userId, status)
    ).rejects.toThrow('Invalid rent or user');

    expect(mockRepositoryRents.RentRepository.findOneById).toHaveBeenCalledWith(
      rentId
    );
    expect(
      mockRepositoryRents.RentRepository.updateStatus
    ).not.toHaveBeenCalled();
  });

  /**
   * Test that the updateRentStatus method throws an error for an invalid user
   * mock the RentRepository.findOneById method to return the expected rent
   * call the updateRentStatus method with the expected parameters
   * expect the RentRepository.findOneById method to have been called with the expected parameters
   * expect the RentRepository.updateStatus method to have been called with the expected parameters
   * expect the updateRentStatus method to throw an error
   */

  it('should delete the rental by ID for owner', async () => {
    const rentId = '123'; 
    const ownerId = '456'; 

    const mockRent = {
      id: rentId,
      user_id_owner: ownerId,
    };

    mockRepositoryRents.RentRepository.findOneByIdAndOwnerId.mockResolvedValue(
      mockRent
    );
    mockRepositoryRents.RentRepository.deleteById.mockResolvedValue(true);

    const result = await RentService.deleteRentByOwner(rentId, ownerId);

    expect(result).toBe(true);
    expect(
      mockRepositoryRents.RentRepository.findOneByIdAndOwnerId
    ).toHaveBeenCalledWith(rentId, ownerId);
    expect(mockRepositoryRents.RentRepository.deleteById).toHaveBeenCalledWith(
      rentId
    );
  });

  /**
   * Test that the deleteRentByOwner method throws an error for an invalid rent or user
   * mock the RentRepository.findOneByIdAndOwnerId method to return null
   * call the deleteRentByOwner method with the expected parameters
   */
  it('should throw an error for deleting a rental by ID for owner with invalid rent or user', async () => {
    const rentId = '123';
    const ownerId = '456';

    mockRepositoryRents.RentRepository.findOneByIdAndOwnerId.mockResolvedValue(
      null
    );

    await expect(
      RentService.deleteRentByOwner(rentId, ownerId)
    ).rejects.toThrow('Invalid rent or user');

    expect(
      mockRepositoryRents.RentRepository.findOneByIdAndOwnerId
    ).toHaveBeenCalledWith(rentId, ownerId);
    expect(mockRepositoryRents.RentRepository.deleteById).not.toHaveBeenCalled();
  });

  /**
   * Test that the deleteRentByOwner method throws an error for an invalid user
   * mock the RentRepository.findOneByIdAndOwnerId method to return the expected rent
   * call the deleteRentByOwner method with the expected parameters
   */
  it('should delete the rental by ID for renter', async () => {
    const rentId = '123'; // rent ID
    const renterId = '789'; // renter ID

    const mockRent = {
      id: rentId,
      user_id_renter: renterId,
    };

    mockRepositoryRents.RentRepository.findOneByIdAndRenterId.mockResolvedValue(
      mockRent
    );
    mockRepositoryRents.RentRepository.deleteById.mockResolvedValue(true);

    const result = await RentService.deleteRentByRenter(rentId, renterId);

    expect(result).toBe(true);
    expect(
      mockRepositoryRents.RentRepository.findOneByIdAndRenterId
    ).toHaveBeenCalledWith(rentId, renterId);
    expect(mockRepositoryRents.RentRepository.deleteById).toHaveBeenCalledWith(
      rentId
    );
  });
  /**
   * Test that the deleteRentByRenter method throws an error for an invalid rent or user
   * mock the RentRepository.findOneByIdAndRenterId method to return null
   * call the deleteRentByRenter method with the expected parameters
   */
  it('should throw an error for deleting a rental by ID for renter with invalid rent or user', async () => {
    const rentId = '123'; // rent ID
    const renterId = '789'; // renter ID

    mockRepositoryRents.RentRepository.findOneByIdAndRenterId.mockResolvedValue(
      null
    );

    await expect(
      RentService.deleteRentByRenter(rentId, renterId)
    ).rejects.toThrow('Invalid rent or user');

    expect(
      mockRepositoryRents.RentRepository.findOneByIdAndRenterId
    ).toHaveBeenCalledWith(rentId, renterId);
    expect(mockRepositoryRents.RentRepository.deleteById).not.toHaveBeenCalled();
  });
});
