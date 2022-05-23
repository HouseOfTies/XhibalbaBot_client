export default function join(bot:any, message: any) {
    const chatId = message.chat.id,
    messageId = message.message_id,
    date = new Date(message.date * 1000).toLocaleDateString();

    const { id, username, is_bot, first_name, last_name } = message.from;
    const userInfo = {
        userId: id,
        username: username,
        first_name: !first_name ? null : first_name,
        last_name: !last_name ? null : last_name,
        registrationDate: date,
    }

    if(!username || is_bot){
        bot.sendMessage("Necesitas un username para registrarte. Si no tienes uno, ve a: Configuracion > username >", {reply_to_message_id: messageId});
    }else{
        //bot.sendMessage(message.chat.id, "Ya estas registrado en los libros de las profundidades. ❌", {reply_to_message_id: message.chat.id});
        const req = require('./registration').default({ userInfo });
        console.log(req);
    }
}