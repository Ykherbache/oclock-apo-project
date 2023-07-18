import { jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryUserPath = '../../../app/modules/repository/userRepository.js';
/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/userService.js';
/**
 * Mocks the repository module.
 */

jest.unstable_mockModule(repositoryUserPath, () => ({
  UserRepository: {
    findUserById: jest.fn(),
    updateUserById: jest.fn(),
    getAllPseudos: jest.fn(),
    getAllCities: jest.fn(),
  },
}));

/**
 * The mocked repository module.
 * @type {{UserRepository: {
 * findUserById: Function,
 * updateUserById: Function,
 * getAllPseudos: Function,
 * getAllCities: Function,
 * }}}
 */
const mockRepositoryUser = await import(repositoryUserPath);

/**
 * The mocked repository module.
 * @type {{
 * UserService: {
 * getUserProfile: Function,
 * updateUserInformation: Function,
 * getAllPseudos: Function,
 * getAllCities: Function,
 *  }}}
 */
const mockService = await import(servicePath);

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should get user profile successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockRepositoryUser.UserRepository.findUserById.mockResolvedValue(mockUser);

    const user = await mockService.UserService.getUserProfile(1);

    expect(user).toEqual(mockUser);
    expect(mockRepositoryUser.UserRepository.findUserById).toHaveBeenCalledWith(
      1
    );
  });

  it('should throw an error when user does not exist', async () => {
    mockRepositoryUser.UserRepository.findUserById.mockResolvedValue(null);

    await expect(mockService.UserService.getUserProfile(1)).resolves.toBeNull();
    expect(mockRepositoryUser.UserRepository.findUserById).toHaveBeenCalledWith(
      1
    );
  });

  it('should update user information successfully', async () => {
    const updates = { name: 'Jane Doe' };
    mockRepositoryUser.UserRepository.updateUserById.mockResolvedValue(updates);

    const updatedUser = await mockService.UserService.updateUserInformation(
      1,
      updates
    );

    expect(updatedUser).toEqual(updates);
    expect(
      mockRepositoryUser.UserRepository.updateUserById
    ).toHaveBeenCalledWith(1, updates);
  });

  it('should throw an error when updating a user that does not exist', async () => {
    const updates = { name: 'Jane Doe' };
    mockRepositoryUser.UserRepository.updateUserById.mockResolvedValue(null);

    await expect(
      mockService.UserService.updateUserInformation(1, updates)
    ).resolves.toBeNull();
    expect(
      mockRepositoryUser.UserRepository.updateUserById
    ).toHaveBeenCalledWith(1, updates);
  });

  it('should get all pseudos successfully', async () => {
    const pseudos = ['john_doe', 'jane_doe'];
    mockRepositoryUser.UserRepository.getAllPseudos.mockResolvedValue(pseudos);

    const result = await mockService.UserService.getAllPseudos();

    expect(result).toEqual(pseudos);
    expect(mockRepositoryUser.UserRepository.getAllPseudos).toHaveBeenCalled();
  });

  it('should get all cities successfully', async () => {
    const cities = ['New York', 'London'];
    mockRepositoryUser.UserRepository.getAllCities.mockResolvedValue(cities);

    const result = await mockService.UserService.getAllCities();

    expect(result).toEqual(cities);
    expect(mockRepositoryUser.UserRepository.getAllCities).toHaveBeenCalled();
  });
});
