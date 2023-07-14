import { MessageRepository } from '../repository/messageRepository.js';

export class MessageService {
  static async createMessage(senderId, receiverPseudo, object, messageContent) {
    const receiver = await MessageRepository.findUserByPseudo(receiverPseudo);
    if (!receiver) {
      throw new Error('User not found');
    }
    return MessageRepository.createMessage({
      receiver_pseudo: receiver.pseudo,
      sender_id: senderId,
      receiver_id: receiver.id,
      object,
      message_content: messageContent,
    });
  }

  static async getUserMessages(userId) {
    return MessageRepository.findUserMessages(userId);
  }

  static async getMessage(messageId) {
    return MessageRepository.findMessageById(messageId);
  }

  static async deleteMessage(messageId) {
    const message = await MessageRepository.deleteMessageById(messageId);
    if (!message) {
      throw new Error('Message not found or unauthorized');
    }
    return message;
  }

  static async toggleMessageReadStatus(messageId, userId) {
    let message = await MessageRepository.findMessageById(messageId);
    if (!message || String(message.receiver_id) !== String(userId)) {
      throw new Error('Message not found or unauthorized');
    }
    const newReadStatus = message.read_message === 1 ? 0 : 1;
    message = await MessageRepository.markMessageAsReadOrUnread(
      messageId,
      newReadStatus
    );
    return { message, messageStatus: newReadStatus === 1 ? 'read' : 'unread' };
  }

  static async countUserUnreadMessages(userId) {
    return MessageRepository.countUnreadMessages(userId);
  }

  static async getUserUnreadMessages(userId) {
    return MessageRepository.findUnreadMessagesForUser(userId);
  }
}
