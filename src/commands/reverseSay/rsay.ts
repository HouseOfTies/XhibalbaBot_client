export default function rsay(bot: any, message: any, value: string) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const text = value[1];
  const reversedText = text.split("").reverse().join("");

  bot.sendMessage(chatId, reversedText, {
    reply_to_message_id: messageId,
    parse_mode: "Markdown",
  });
}
