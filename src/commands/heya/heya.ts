export default function heya(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;

  bot.sendMessage(
    chatId,
    `Te saludo con entusiasmo. Pasate por el libro de comandos escribiendo /help`,
    { reply_to_message_id: messageId }
  );
}
