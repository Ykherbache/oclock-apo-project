import { jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryPath = '../../../app/modules/repository/mechanicsRepository.js';

/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/mechanicsService.js';

/**
 * Mocks the repository module.
 */
jest.unstable_mockModule(repositoryPath, () => ({
  MechanicsRepository: {
    findAllMechanics: jest.fn(),
  },
}));

/**
 * The mocked repository module.
 * @type {{MechanicsRepository: {findAllMechanics: Function}}}
 */

const mockRepository = await import(repositoryPath);
/**
 * The service module being tested.
 @type {{MechanicsService: {getAllMechanics: Function}}}
 */

const mockService = await import(servicePath);

/**
 * Test suite for the MechanicsService.
 */
describe('MechanicsService', () => {
  /**
   * Clears the mock function's calls before each test.
   */
  beforeEach(() => {
    mockRepository.MechanicsRepository.findAllMechanics.mockClear();
  });

  /**
   * Test case for fetching all mechanics.
   */
  it('should fetch all mechanics', async () => {
    const mechanics = [
      { id: 1, name: 'Mechanic 1' },
      { id: 2, name: 'Mechanic 2' },
    ];
    mockRepository.MechanicsRepository.findAllMechanics.mockResolvedValue(
      mechanics
    );
    const result = await mockService.MechanicsService.getAllMechanics();
    expect(result).toEqual(mechanics);
    expect(
      mockRepository.MechanicsRepository.findAllMechanics
    ).toHaveBeenCalled();
  });
});
