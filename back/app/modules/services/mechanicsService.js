import { MechanicsRepository } from '../repository/mechanicsRepository.js';

export class MechanicsService {
  static async getAllMechanics() {
    return MechanicsRepository.findAllMechanics();
  }
}
