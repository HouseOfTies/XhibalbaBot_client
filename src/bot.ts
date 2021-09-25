import TelegramBot from 'node-telegram-bot-api';
import config from './config';

const bot: TelegramBot = new TelegramBot(config.bot, {polling: true});

bot.on('polling_error', error => {
  console.log(error);
});

console.log("\nConnected with the darkness of 7th\n");

bot.onText(/^\/heya/, function(message){
  bot.sendMessage(message.chat.id, `Greetings 👋🏻 ${message.from.username}`);
});

bot.on('message', function (message) {
    console.log(message);
});
