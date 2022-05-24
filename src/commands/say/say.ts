export default function say(bot: any, message: any, value: string) {
  const chatId = message.chat.id,
    messageId = message.message_id;

  bot.sendMessage(chatId, value[1], {
    reply_to_message_id: messageId,
    parse_mode: "MarkdownV2",
  });
}

