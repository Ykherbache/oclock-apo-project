import { UserRepository } from '../repository/userRepository.js';

export class UserService {
  static async getUserProfile(userId) {
    return UserRepository.findUserById(userId);
  }

  static async updateUserInformation(userId, updates) {
    return UserRepository.updateUserById(userId, updates);
  }

  static async getAllPseudos() {
    return UserRepository.getAllPseudos();
  }

  static async getAllCities() {
    return UserRepository.getAllCities();
  }
}
