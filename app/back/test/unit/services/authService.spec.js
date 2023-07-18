import bcrypt from 'bcryptjs';
import { jest } from '@jest/globals';
import { TOKEN_EXPIRY_TIME } from '../../../app/utils/core/genericConstants.js';

/**
 * Path to the module containing the jwt utils functions
 * @type {string}
 */

const jwtUtilsPath = '../../../app/utils/utils/jwtUtils.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryPath = '../../../app/modules/repository/authRepository.js';

/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/authService.js';

/**
 * Mocks the repository module.
 */
jest.unstable_mockModule(repositoryPath, () => ({
  AuthRepository: {
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    updateUserById: jest.fn(),
  },
}));

jest.unstable_mockModule(jwtUtilsPath, () => ({
  generateToken: jest.fn(() => 'mockToken'),
}));
/**
 * The mocked repository module.
 * @type {{AuthRepository: {createUser: Function, findUserByEmail: Function, updateUserById: Function}}}
 */
const mockRepository = await import(repositoryPath);

const mockJwtUtils = await import(jwtUtilsPath);

/**
 * The service module being tested.
 * @type {{AuthService: {registerUser: Function, loginUser: Function, logoutUser: Function, processForgotPassword: Function}}}
 */
const mockService = await import(servicePath);

// Mock bcrypt's hashSync function
jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => 'hashedPassword');

// Mock bcrypt's compareSync function
jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);

/**
 * Test suite for the AuthService.
 */
describe('AuthService', () => {
  /**
   * Clears the mock function's calls before each test.
   */
  beforeEach(() => {
    mockRepository.AuthRepository.createUser.mockClear();
    mockRepository.AuthRepository.findUserByEmail.mockClear();
    mockRepository.AuthRepository.updateUserById.mockClear();
  });

  /**
   * Test case for registering a new user.
   */
  it('should register a new user', async () => {
    // define the user details
    const userDetails = {
      email: 'test@example.com',
      lastname: 'Doe',
      firstname: 'John',
      password: 'password123',
      pseudo: 'johndoe',
    };

    // mock the response from createUser
    mockRepository.AuthRepository.createUser.mockResolvedValue(userDetails);

    // call the registerUser method
    const result = await mockService.AuthService.registerUser(userDetails);

    // ensure that the createUser method was called with the correct arguments
    expect(mockRepository.AuthRepository.createUser).toHaveBeenCalledWith({
      ...userDetails,
      password: 'hashedPassword',
    });

    // verify the result
    expect(result).toEqual(userDetails);
  });

  /**
   * Test case for logging in a user.
   */
  it('should login a user', async () => {
    const user = {
      email: 'test@example.com',
      password: 'hashedPassword',
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
    };

    // mock the response from findUserByEmail
    mockRepository.AuthRepository.findUserByEmail.mockResolvedValue(user);

    // mock the response from updateUserById
    mockRepository.AuthRepository.updateUserById.mockResolvedValue({
      ...user,
      isLoggedIn: true,
    });

    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    // call the loginUser method
    const result = await mockService.AuthService.loginUser(credentials);

    // verify the result
    expect(result).toEqual({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  });

  /**
   * Test case for logging out a user.
   */
  it('should log out a user', async () => {
    const userId = 1;

    // mock the response from updateUserById
    mockRepository.AuthRepository.updateUserById.mockResolvedValue({
      id: userId,
      isLoggedIn: false,
    });

    // call the logoutUser method
    const result = await mockService.AuthService.logoutUser(userId);

    // ensure that the updateUserById method was called with the correct arguments
    expect(mockRepository.AuthRepository.updateUserById).toHaveBeenCalledWith(
      userId,
      { isLoggedIn: false }
    );

    // verify the result
    expect(result).toEqual({ id: userId, isLoggedIn: false });
  });

  /**
   * Test case for processing forgot password request.
   */
  it('should process forgot password request', async () => {
    const email = 'test@example.com';
    const userId = 1;

    // mock the response from findUserByEmail
    mockRepository.AuthRepository.findUserByEmail.mockResolvedValue({
      id: userId,
      email,
    });

    // call the processForgotPassword method
    const result = await mockService.AuthService.processForgotPassword(email);

    // check that generateToken was called with the correct arguments

    expect(mockJwtUtils.generateToken).toHaveBeenCalledWith(
      { id: userId },
      TOKEN_EXPIRY_TIME
    );

    // verify the result
    expect(result).toEqual({
      user: { id: userId, email },
      token: 'mockToken',
    });
  });
  /**
   * Test case for login failure due to invalid password.
   */
  it('should fail login due to invalid password', async () => {
    const user = {
      email: 'test@example.com',
      password: 'hashedPassword',
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
    };

    // mock the response from findUserByEmail
    mockRepository.AuthRepository.findUserByEmail.mockResolvedValue(user);

    // set bcrypt compareSync to return false
    bcrypt.compareSync.mockReturnValue(false);

    const credentials = {
      email: 'test@example.com',
      password: 'wrongPassword',
    };

    // expect the loginUser method to throw an error
    await expect(
      mockService.AuthService.loginUser(credentials)
    ).rejects.toThrow('Incorrect password!');
  });

  /**
   * Test case for login failure due to user not found.
   */
  it('should fail login due to user not found', async () => {
    const email = 'test@example.com';

    // set findUserByEmail to return null
    mockRepository.AuthRepository.findUserByEmail.mockResolvedValue(null);

    const credentials = {
      email,
      password: 'password123',
    };

    // expect the loginUser method to throw an error
    await expect(
      mockService.AuthService.loginUser(credentials)
    ).rejects.toThrow('User not found.');
  });
});
