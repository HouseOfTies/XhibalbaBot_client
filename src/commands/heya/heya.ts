export default function heya(bot:any, message: any) {
    const chatId = message.chat.id,
    username = message.from.username,
    messageId = message.message_id;
    
    bot.sendMessage(chatId, `Hi @${username}`, {reply_to_message_id: messageId});
}