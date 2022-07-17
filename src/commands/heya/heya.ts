export default function heya(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;

  bot.sendMessage(
    chatId,
    `Para mi es un placer saludarte con entusiasmo. Pasate por el libro de comandos escribiendo /help para ver mis comandos.`,
    { reply_to_message_id: messageId }
  );
}
