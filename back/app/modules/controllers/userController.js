import { UserService } from '../services/userService.js';

export class UserController {
  static async getUserProfil(req, res) {
    try {
      const user = await UserService.getUserProfile(req.params.id);
      if (!user) {
        return res.status(405).send({ message: 'User not found' });
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  static async updateUserInformation(req, res) {
    try {
      const user = await UserService.updateUserInformation(
        req.body.id,
        req.body
      );
      if (!user) {
        return res.status(405).send({ message: 'User not found' });
      }
      res.send({ message: 'User was updated successfully!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  static async getAllPseudo(req, res) {
    try {
      const pseudos = await UserService.getAllPseudos();
      res.status(200).json(pseudos);
    } catch (error) {
      console.error('Erreur lors de la récupération des pseudos :', error);
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération des pseudos' });
    }
  }

  static async getAllCities(req, res) {
    try {
      const cities = await UserService.getAllCities();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des villes.',
      });
    }
  }
}
