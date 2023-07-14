import { jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const gamesRepositoryPath =
  '../../../app/modules/repository/gamesRepository.js';

const categoryRepositoryPath =
  '../../../app/modules/repository/categoriesRepository.js';
const mechanicsRepositoryPath =
  '../../../app/modules/repository/mechanicsRepository.js';
const publishersRepositoryPath =
  '../../../app/modules/repository/publishersRepository.js';

/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/gamesService.js';
/**
 * Mocks the repository module.
 */
jest.unstable_mockModule(gamesRepositoryPath, () => ({
  GamesRepository: {
    findAllGames: jest.fn(),
    findGameById: jest.fn(),
    findGamesByName: jest.fn(),
    findAllGamesName: jest.fn(),
  },
}));

jest.unstable_mockModule(categoryRepositoryPath, () => ({
  CategoriesRepository: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule(mechanicsRepositoryPath, () => ({
  MechanicsRepository: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule(publishersRepositoryPath, () => ({
  PublishersRepository: {
    findById: jest.fn(),
  },
}));
/**
 * The mocked games repository module.
 * @type {
 *     {
 *      GamesRepository: {
 *        findAllGames: Function,
 *        findGameById: Function,
 *        findGamesByName: Function,
 *        findAllGamesName: Function,
 *     }
 *  }
 * }
 */
const mockGamesRepository = await import(gamesRepositoryPath);
/**
 * The mocked categories repository module.
 * @type {{CategoriesRepository: {findById: Function}}}
 */
const mockCategoryRepository = await import(categoryRepositoryPath);
/**
 * The mocked mechanics repository module.
 * @type {{MechanicsRepository: { findById: Function}}}
 */
const mockMechanicsRepository = await import(mechanicsRepositoryPath);
/**
 * The mocked publishers repository module.
 * @type {{PublishersRepository: {findById: Function }}}
 */
const mockPublishersRepository = await import(publishersRepositoryPath);

/**
 * The mocked games service module.
 * @type {
 *     {
 *      GamesService: {
 *        getAllGames: Function,
 *        getGamesByName: Function,
 *        getGameById: Function,
 *        getAllGamesName: Function,
 *     }
 *  }
 * }
 */
const mockService = await import(servicePath);

describe('Games Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all games', async () => {
    mockGamesRepository.GamesRepository.findAllGames.mockResolvedValue([
      'game1',
      'game2',
    ]);

    const games = await mockService.GamesService.getAllGames();

    expect(games).toEqual(['game1', 'game2']);
    expect(mockGamesRepository.GamesRepository.findAllGames).toHaveBeenCalled();
  });

  it('should retrieve game by id', async () => {
    const mockGame = {
      id: 1,
      name: 'Game 1',
      category_id: 1,
      mechanics_type_id: 1,
      publisher_id: 1,
      toJSON: () => ({
        id: 1,
        name: 'Game 1',
        category_id: 1,
        mechanics_type_id: 1,
        publisher_id: 1,
      }),
    };

    const mockCategory = { id: 1, name: 'Category 1' };
    const mockMechanic = { id: 1, name: 'Mechanic 1' };
    const mockPublisher = { id: 1, name: 'Publisher 1' };

    mockGamesRepository.GamesRepository.findGameById.mockResolvedValue(
      mockGame
    );
    mockCategoryRepository.CategoriesRepository.findById.mockResolvedValue(
      mockCategory
    );
    mockMechanicsRepository.MechanicsRepository.findById.mockResolvedValue(
      mockMechanic
    );
    mockPublishersRepository.PublishersRepository.findById.mockResolvedValue(
      mockPublisher
    );

    const game = await mockService.GamesService.getGameById(1);

    expect(game).toEqual({
      ...mockGame.toJSON(),
      category_name: mockCategory.name,
      mechanic_name: mockMechanic.name,
      publisher_name: mockPublisher.name,
    });
    expect(
      mockGamesRepository.GamesRepository.findGameById
    ).toHaveBeenCalledWith(1);
  });

  it('should retrieve game by id, handle null category, mechanic and publisher', async () => {
    const mockGame = {
      id: 1,
      name: 'Game 1',
      category_id: null,
      mechanics_type_id: null,
      publisher_id: null,
      toJSON: () => ({
        id: 1,
        name: 'Game 1',
        category_id: null,
        mechanics_type_id: null,
        publisher_id: null,
      }),
    };

    mockGamesRepository.GamesRepository.findGameById.mockResolvedValue(
      mockGame
    );

    const game = await mockService.GamesService.getGameById(1);

    expect(game).toEqual({
      ...mockGame.toJSON(),
      category_name: null,
      mechanic_name: null,
      publisher_name: null,
    });
    expect(
      mockGamesRepository.GamesRepository.findGameById
    ).toHaveBeenCalledWith(1);
  });

  it('should retrieve game by name', async () => {
    mockGamesRepository.GamesRepository.findGamesByName.mockResolvedValue([
      'game1',
      'game2',
    ]);

    const games = await mockService.GamesService.getGamesByName('game');

    expect(games).toEqual(['game1', 'game2']);
    expect(
      mockGamesRepository.GamesRepository.findGamesByName
    ).toHaveBeenCalledWith('game');
  });

  it('should retrieve all games name', async () => {
    mockGamesRepository.GamesRepository.findAllGamesName.mockResolvedValue([
      'game1',
      'game2',
    ]);

    const games = await mockService.GamesService.getAllGamesName();

    expect(games).toEqual(['game1', 'game2']);
    expect(
      mockGamesRepository.GamesRepository.findAllGamesName
    ).toHaveBeenCalled();
  });

  it('should throw an error if game not found', async () => {
    mockGamesRepository.GamesRepository.findGameById.mockResolvedValue(null);

    await expect(mockService.GamesService.getGameById(1)).rejects.toThrow();
  });

  it('should throw an error if unable to retrieve all games', async () => {
    mockGamesRepository.GamesRepository.findAllGames.mockImplementation(() => {
      throw new Error('Unable to retrieve games');
    });

    await expect(mockService.GamesService.getAllGames()).rejects.toThrow(
      'Unable to retrieve games'
    );
  });

  it('should throw an error if unable to retrieve game by name', async () => {
    mockGamesRepository.GamesRepository.findGamesByName.mockImplementation(
      () => {
        throw new Error('Unable to retrieve game by name');
      }
    );

    await expect(
      mockService.GamesService.getGamesByName('Game 1')
    ).rejects.toThrow('Unable to retrieve game by name');
  });

  it('should throw an error if unable to retrieve all games names', async () => {
    mockGamesRepository.GamesRepository.findAllGamesName.mockImplementation(
      () => {
        throw new Error('Unable to retrieve all games names');
      }
    );

    await expect(mockService.GamesService.getAllGamesName()).rejects.toThrow(
      'Unable to retrieve all games names'
    );
  });
});
