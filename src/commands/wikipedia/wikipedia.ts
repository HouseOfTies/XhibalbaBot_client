export default function wikipedia(bot: any, message: any) {
    const chatId = message.chat.id,
      messageId = message.message_id;
    const userId: number = message.from.id;
  
    bot.sendMessage(chatId, "Wiki command");
  }
  