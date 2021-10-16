import Logger from '@/loaders/logger';
import gtts from 'gtts';

export default function vsay(bot:any, message: any, value: string) {
    const chatId = message.chat.id,
    username = message.from.username,
    messageId = message.message_id;

    const text = new gtts(value[1], 'es');

    text.save('vsay.mp3', function (err, result) {
        if(err) { Logger.error(err) }
        bot.sendAudio(chatId, './vsay.mp3', {title: "Your message 🎶", reply_to_message_id: messageId});
    });
}