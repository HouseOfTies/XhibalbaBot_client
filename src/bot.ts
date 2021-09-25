import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

import TelegramBot from 'node-telegram-bot-api';

async function startBot(){
  const bot: TelegramBot = new TelegramBot(config.bot, {polling: true});
  const app = express();

  bot.on('polling_error', error => {
  console.log(error);
  });

  bot.on('message', message => {
    console.log(message);
  });

  console.log(`
      ###############################################
          🔰  Xhiba listening on port: ${config.port} 🔰
      ###############################################
  `);
}

startBot();
/* 

console.log("\nConnected with the darkness of 7th\n");

bot.onText(/^\/heya/, function(message){
  bot.sendMessage(message.chat.id, `Greetings 👋🏻`);
});

bot.on('message', function (message) {
    console.log(message);
}); */