export default async ({ bot }) => {
    // Example command flag
    bot.onText(/^\/heya/, async (message) => {
    // Whole programming logic within this section
    bot.sendMessage(message.chat.id, `Hi @${message.from.username}`, {reply_to_message_id: message.message_id});
    });
};