import { RentService } from '../services/rentsService.js';
import { enrichRentsWithAssociatedInfo } from '../../utils/utils/rentsUtils.js';

export class RentsController {
  static createRent = async (req, res) => {
    try {
      const { game_id, owner_id } = req.body;

      if (!game_id || !owner_id) {
        return res
          .status(400)
          .send({ message: 'game_id ou owner_id not valid' });
      }

      const response = await RentService.createRent(req.body);
      res.status(201).json(response);
    } catch (error) {
      console.error('Erreur lors de la création de la location:', error);
      res
        .status(500)
        .json({ error: 'Erreur lors de la création de la location' });
    }
  };

  static UpdateRentStatus = async (req, res) => {
    try {
      const rent_id = req.params.id;
      const user_id = req.body.user_id;
      const status = req.body.status;
      const updatedRent = await RentService.updateRentStatus(
        rent_id,
        user_id,
        status
      );
      res.status(200).json(updatedRent);
    } catch (error) {
      console.error('Error updating the rent status:', error);
      res.status(500).json({ error: 'Error updating the rent status' });
    }
  };

  static getRentsByOwnerId = async (req, res) => {
    try {
      const user_id = req.params.idRentOwner;
      const page = req.query.page;
      const limit = Number(req.query.pageSize) ?? 5;
      const status = req.params.status;

      let { rows, count } = await RentService.getRentsByOwnerId(
        user_id,
        page,
        limit,
        status
      );

      if (rows.length === 0) {
        return res.status(201).json({ message: 'No rent in running' });
      }
      rows = await enrichRentsWithAssociatedInfo(rows);
      const totalPages = Math.ceil(count / limit);

      res.status(200).json({
        totalItems: count,
        currentPage: page,
        totalPages: totalPages,
        rents: rows,
      });
    } catch (error) {
      console.error('Error retrieving rentals:', error);
      res.status(500).json({ error: 'Error retrieving rentals' });
    }
  };

  static getRentsByRenterId = async (req, res) => {
    try {
      const user_id = req.params.idRentRenter;
      const page = req.query.page;
      const limit = Number(req.query.pageSize) ?? 5;
      const status = req.params.status;

      let { rows, count } = await RentService.getRentsByRenterId(
        user_id,
        page,
        limit,
        status
      );

      if (rows.length === 0) {
        return res.status(201).json({ message: 'No rent in running' });
      }

      rows = await enrichRentsWithAssociatedInfo(rows);

      const totalPages = Math.ceil(count / limit);

      res.status(200).json({
        totalItems: count,
        currentPage: page,
        totalPages: totalPages,
        rents: rows,
      });
    } catch (error) {
      console.error('Error retrieving rentals:', error);
      res.status(500).json({ error: 'Error retrieving rentals' });
    }
  };
  static deleteByOwner = async (req, res) => {
    try {
      const rent_id = req.params.idRent;
      const owner_id = req.params.idOwner;

      await RentService.deleteRentByOwner(rent_id, owner_id);

      res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
      console.error('Error deleting the rental:', error);
      res.status(500).json({ error: 'Error deleting the rental' });
    }
  };

  static deleteByRenter = async (req, res) => {
    try {
      const rent_id = req.params.idRent;
      const renter_id = req.params.idRenter;

      await RentService.deleteRentByRenter(rent_id, renter_id);

      res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
      console.error('Error deleting the rental:', error);
      res.status(500).json({ error: 'Error deleting the rental' });
    }
  };
}
