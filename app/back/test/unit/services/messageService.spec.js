import { jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryMessagePath =
  '../../../app/modules/repository/messageRepository.js';
/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/messageService.js';

/**
 * Mocks the repository module.
 */
jest.unstable_mockModule(repositoryMessagePath, () => ({
  MessageRepository: {
    createMessage: jest.fn(),
    findUserByPseudo: jest.fn(),
    findUserMessages: jest.fn(),
    findMessageById: jest.fn(),
    deleteMessageById: jest.fn(),
    markMessageAsReadOrUnread: jest.fn(),
    countUnreadMessages: jest.fn(),
    findUnreadMessagesForUser: jest.fn(),
  },
}));

/**
 * The mocked repository module.
 * @type {{MessageRepository: {
 * createMessage: Function,
 * findUserByPseudo: Function,
 * findUserMessages: Function,
 * findMessageById: Function,
 * deleteMessageById: Function,
 * markMessageAsReadOrUnread: Function,
 * countUnreadMessages: Function,
 * findUnreadMessagesForUser: Function
 * }}}
 */
const mockRepositoryMessage = await import(repositoryMessagePath);

/**
 * The mocked repository module.
 * @type {{MessageService: {
 * createMessage: Function,
 * deleteMessage: Function,
 * getMessage: Function,
 * getUserMessages: Function,
 * toggleMessageReadStatus: Function,
 * countUserUnreadMessages: Function,
 * getUserUnreadMessages: Function,
 *  }}}
 */
const mockService = await import(servicePath);

describe('MessageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new message', async () => {
    mockRepositoryMessage.MessageRepository.findUserByPseudo.mockResolvedValue({
      pseudo: 'receiver',
    });
    mockRepositoryMessage.MessageRepository.createMessage.mockResolvedValue(
      'New message created'
    );

    const result = await mockService.MessageService.createMessage(
      1,
      'receiver',
      'object',
      'content'
    );

    expect(result).toBe('New message created');
    expect(
      mockRepositoryMessage.MessageRepository.findUserByPseudo
    ).toBeCalledWith('receiver');
    expect(
      mockRepositoryMessage.MessageRepository.createMessage
    ).toBeCalledWith({
      receiver_pseudo: 'receiver',
      sender_id: 1,
      object: 'object',
      message_content: 'content',
    });
  });

  it('should get user messages', async () => {
    mockRepositoryMessage.MessageRepository.findUserMessages.mockResolvedValue([
      'message1',
      'message2',
    ]);

    const result = await mockService.MessageService.getUserMessages(1);

    expect(result).toEqual(['message1', 'message2']);
    expect(
      mockRepositoryMessage.MessageRepository.findUserMessages
    ).toBeCalledWith(1);
  });

  it('should get a message', async () => {
    mockRepositoryMessage.MessageRepository.findMessageById.mockResolvedValue(
      'message'
    );

    const result = await mockService.MessageService.getMessage(1);

    expect(result).toBe('message');
    expect(
      mockRepositoryMessage.MessageRepository.findMessageById
    ).toBeCalledWith(1);
  });

  it('should delete a message', async () => {
    mockRepositoryMessage.MessageRepository.deleteMessageById.mockResolvedValue(
      'message deleted'
    );

    const result = await mockService.MessageService.deleteMessage(1);

    expect(result).toBe('message deleted');
    expect(
      mockRepositoryMessage.MessageRepository.deleteMessageById
    ).toBeCalledWith(1);
  });

  it('should toggle message read status', async () => {
    mockRepositoryMessage.MessageRepository.findMessageById.mockResolvedValue({
      read_message: 0,
      receiver_id: 1,
    });
    mockRepositoryMessage.MessageRepository.markMessageAsReadOrUnread.mockResolvedValue(
      'message'
    );

    const result = await mockService.MessageService.toggleMessageReadStatus(
      1,
      1
    );

    expect(result).toEqual({ message: 'message', messageStatus: 'read' });
    expect(
      mockRepositoryMessage.MessageRepository.findMessageById
    ).toBeCalledWith(1);
    expect(
      mockRepositoryMessage.MessageRepository.markMessageAsReadOrUnread
    ).toBeCalledWith(1, 1);
  });

  it('should count user unread messages', async () => {
    mockRepositoryMessage.MessageRepository.countUnreadMessages.mockResolvedValue(
      5
    );

    const result = await mockService.MessageService.countUserUnreadMessages(1);

    expect(result).toBe(5);
    expect(
      mockRepositoryMessage.MessageRepository.countUnreadMessages
    ).toBeCalledWith(1);
  });

  it('should get user unread messages', async () => {
    mockRepositoryMessage.MessageRepository.findUnreadMessagesForUser.mockResolvedValue(
      ['message1', 'message2']
    );

    const result = await mockService.MessageService.getUserUnreadMessages(1);

    expect(result).toEqual(['message1', 'message2']);
    expect(
      mockRepositoryMessage.MessageRepository.findUnreadMessagesForUser
    ).toBeCalledWith(1);
  });

  it('should throw an error if receiver user not found when creating a message', async () => {
    mockRepositoryMessage.MessageRepository.findUserByPseudo.mockResolvedValue(
      null
    );
    await expect(
      mockService.MessageService.createMessage(
        1,
        'receiver',
        'object',
        'content'
      )
    ).rejects.toThrow('User not found');
  });

  it('should throw an error if message not found when deleting a message', async () => {
    mockRepositoryMessage.MessageRepository.deleteMessageById.mockResolvedValue(
      null
    );
    await expect(mockService.MessageService.deleteMessage(1)).rejects.toThrow(
      'Message not found or unauthorized'
    );
  });

  it('should throw an error if message not found or user is unauthorized when toggling message read status', async () => {
    mockRepositoryMessage.MessageRepository.findMessageById.mockResolvedValue(
      null
    );
    await expect(
      mockService.MessageService.toggleMessageReadStatus(1, 1)
    ).rejects.toThrow('Message not found or unauthorized');
  });

  it('should throw an error if message not found when getting a message', async () => {
    mockRepositoryMessage.MessageRepository.findMessageById.mockResolvedValue(
      null
    );
    await expect(await mockService.MessageService.getMessage(1)).toBeNull();
  });

  it('should return empty array when no messages found for a user', async () => {
    mockRepositoryMessage.MessageRepository.findUserMessages.mockResolvedValue(
      []
    );
    const result = await mockService.MessageService.getUserMessages(1);
    expect(result).toEqual([]);
  });

  it('should throw an error if user unauthorized when trying to toggle read status', async () => {
    mockRepositoryMessage.MessageRepository.findMessageById.mockResolvedValue({
      read_message: 0,
      receiver_id: 2,
    });
    await expect(
      mockService.MessageService.toggleMessageReadStatus(1, 1)
    ).rejects.toThrow('Message not found or unauthorized');
  });

  it('should return 0 when no unread messages found for a user', async () => {
    mockRepositoryMessage.MessageRepository.countUnreadMessages.mockResolvedValue(
      0
    );
    const result = await mockService.MessageService.countUserUnreadMessages(1);
    expect(result).toBe(0);
  });

  it('should return empty array when no unread messages found for a user', async () => {
    mockRepositoryMessage.MessageRepository.findUnreadMessagesForUser.mockResolvedValue(
      []
    );
    const result = await mockService.MessageService.getUserUnreadMessages(1);
    expect(result).toEqual([]);
  });
});
