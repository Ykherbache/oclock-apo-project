import models from '../../database/models/init-models.js';
import { Op } from 'sequelize';
import { withErrorHandling } from '../../utils/helpers/errorHandler.js';

export class MessageRepository {
  static message = models.message;
  static users = models.users;
  static findUserByPseudo = withErrorHandling(async (pseudo) => {
    return await this.users.findOne({ where: { pseudo } });
  });

  static createMessage = withErrorHandling(async (data) => {
    return this.message.create(data);
  });

  static findUserMessages = withErrorHandling(async (userId) => {
    return await this.message.findAll({
      where: {
        [Op.or]: [{ receiver_id: userId }, { sender_id: userId }],
      },
      include: [
        {
          model: this.users,
          as: 'sender',
          attributes: ['id', 'pseudo', 'img'],
        },
        {
          model: this.users,
          as: 'receiver',
          attributes: ['id', 'pseudo', 'img'],
        },
      ],
    });
  });

  static findMessageById = withErrorHandling(async (messageId) => {
    return await this.message.findOne({
      where: { id: messageId },
      include: [
        {
          model: this.users,
          as: 'sender',
          attributes: ['id', 'pseudo', 'img'],
        },
        {
          model: this.users,
          as: 'receiver',
          attributes: ['id', 'pseudo', 'img'],
        },
      ],
    });
  });

  static deleteMessageById = withErrorHandling(async (messageId) => {
    const msg = await this.message.findByPk(messageId);
    if (msg) {
      await msg.destroy();
    }
    return msg;
  });

  static markMessageAsReadOrUnread = withErrorHandling(
    async (messageId, readMessage) => {
      const msg = await this.message.findByPk(messageId);
      if (msg) {
        await msg.update({ read_message: readMessage });
      }
      return msg;
    }
  );

  static countUnreadMessages = withErrorHandling(async (userId) => {
    return this.message.count({
      where: {
        receiver_id: userId,
        read_message: 0,
      },
    });
  });

  static findUnreadMessagesForUser = withErrorHandling(async (userId) => {
    return this.message.findAll({
      where: {
        receiver_id: userId,
        read_message: 0,
      },
      include: [
        {
          model: this.users,
          as: 'sender',
          attributes: ['id', 'pseudo', 'img'],
        },
      ],
    });
  });
}
