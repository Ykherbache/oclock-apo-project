import { MessageService } from '../services/messageService.js';

export class MessageController {
  static CreateMessage = async (req, res) => {
    try {
      const createdMessage = await MessageService.createMessage(
        req.body.sender_id,
        req.body.receiver_pseudo,
        req.body.object,
        req.body.message_content
      );
      res.send({ message: 'Message was created & sent', data: createdMessage });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static getAllUserMessages = async (req, res) => {
    try {
      const userId = req.params.userId;
      const messages = await MessageService.getUserMessages(userId);
      res.send(messages);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static findOneMessage = async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const message = await MessageService.getMessage(messageId);
      res.send(message);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static deleteMessage = async (req, res) => {
    try {
      const messageId = req.query.messageId;
      const userId = req.query.userId;
      const message = await MessageService.deleteMessage(messageId, userId);
      res.send({ message });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static markMessageIsRead = async (req, res) => {
    try {
      const messageId = req.params.messageId;
      const userId = req.params.userId;
      const message = await MessageService.toggleMessageReadStatus(
        messageId,
        userId
      );
      res.send({ message });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static countUnreadMessages = async (req, res) => {
    try {
      const userId = req.params.userId;
      const count = await MessageService.countUserUnreadMessages(userId);
      res.send({ count });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static getUnreadMessagesForUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const messages = await MessageService.getUserUnreadMessages(userId);
      res.send(messages);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}
