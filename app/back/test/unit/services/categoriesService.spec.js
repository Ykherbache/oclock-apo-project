import { jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryPath =
  '../../../app/modules/repository/categoriesRepository.js';

/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/categoriesService.js';

/**
 * Mocks the repository module.
 */
jest.unstable_mockModule(repositoryPath, () => ({
  CategoriesRepository: {
    findAll: jest.fn(),
  },
}));

/**
 * The mocked repository module.
 * @type {{CategoriesRepository: {findAll: Function}}}
 */
const mockRepository = await import(repositoryPath);

/**
 * The service module being tested.
 * @type {{CategoriesService: {getAllCategories: Function}}}
 */
const mockService = await import(servicePath);

/**
 * Test suite for the CategoriesService.
 */
describe('CategoriesService', () => {
  /**
   * Clears the mock function's calls before each test.
   */
  beforeEach(() => {
    mockRepository.CategoriesRepository.findAll.mockClear();
  });

  /**
   * Test case for fetching all categories.
   */
  it('should fetch all categories', async () => {
    const categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];
    mockRepository.CategoriesRepository.findAll.mockResolvedValue(categories);

    const result = await mockService.CategoriesService.getAllCategories();
    expect(result).toEqual(categories);
    expect(mockRepository.CategoriesRepository.findAll).toHaveBeenCalled();
  });
});
