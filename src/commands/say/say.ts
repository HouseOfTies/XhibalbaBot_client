export default function say(bot: any, message: any, value: string) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const text: string = value[1];

  bot.sendMessage(chatId, text, {
    reply_to_message_id: messageId,
    parse_mode: "MarkdownV2",
  });
}
