export default function say(bot:any, message: any, value: string) {
    const chatId = message.chat.id,
    username = message.from.username,
    messageId = message.message_id;

    bot.sendMessage(chatId, value[1], {reply_to_message_id: messageId});
}