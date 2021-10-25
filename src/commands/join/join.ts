export default function join(bot:any, message: any) {
    const chatId = message.chat.id,
    messageId = message.message_id,
    date = new Date(message.date * 1000).toLocaleString();

    const { username, is_bot, first_name, last_name } = message.from;

    if(!username || is_bot){
        bot.sendMessage("Necesitas un username para registrarte. Si no tienes uno, ve a: Configuracion > username >", {reply_to_message_id: messageId});
    }else{
        bot.sendMessage(chatId, `He anotado tu nombre en las profundidades @${username} ✒📖\n\nFecha de registro: ${date}`, {reply_to_message_id: messageId});
    }
}