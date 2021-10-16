import Logger from './logger';

export default async ({ bot, message }) => {
    Logger.info("Commands loaded ✅");
    
    // Example command
    bot.onText(/^\/heya/, async (message) => {
    // Whole programming logic within this section
    bot.sendMessage(message.chat.id, `Hi @${message.from.username}`, {reply_to_message_id: message.message_id});
    });
};