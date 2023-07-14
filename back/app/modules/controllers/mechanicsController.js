import { MechanicsService } from '../services/mechanicsService.js';

export class MechanicsController {
  static async getAllMechanics(req, res) {
    try {
      const mechanics = await MechanicsService.getAllMechanics();
      res.status(200).json(mechanics);
    } catch (error) {
      console.error('Error retrieving mechanics :', error);
      res.status(500).json({ error: 'Error retrieving mechanics' });
    }
  }
}
