import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/utils/jwtUtils.js';
import { TOKEN_EXPIRY_TIME } from '../../utils/core/genericConstants.js';
import { AuthRepository } from '../repository/authRepository.js';

export class AuthService {
  static async registerUser({ email, lastname, firstname, password, pseudo }) {
    const hashedPassword = bcrypt.hashSync(password, 8);
    return await AuthRepository.createUser({
      email,
      lastname,
      firstname,
      password: hashedPassword,
      pseudo,
    });
  }

  static async loginUser({ email, password }) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Incorrect password!');
    }

    await AuthRepository.updateUserById(user.id, { isLoggedIn: true });
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  }

  static async logoutUser(userId) {
    const user = await AuthRepository.updateUserById(userId, {
      isLoggedIn: false,
    });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }

  static async processForgotPassword(email) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }
    const token = generateToken({ id: user.id }, TOKEN_EXPIRY_TIME); // expires in 1 hour
    return { user, token };
  }
}
