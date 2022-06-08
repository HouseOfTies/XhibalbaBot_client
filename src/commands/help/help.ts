export default function help(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;

  const buttons: any = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⬅️ Atrás",
            callback_data: "back",
          },
          {
            text: "Siguiente ➡️",
            callback_data: "next",
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, "help command", buttons);
}