import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import Logger from './loaders/logger';

async function startBot(){
  const bot: TelegramBot = new TelegramBot(config.bot, {polling: true});
  const app = express();

  bot.on('polling_error', error => {
  console.log(error);
  });

  bot.on('message', message => {
    console.log(message);
  });

  app.listen(config.port, () => { 
    Logger.info(`
    -----------------------------------------------
          🔰 Xhiba listening on port: ${config.port} 🔰
    -----------------------------------------------
  `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });
}

startBot();
