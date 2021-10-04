import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import Logger from './loaders/logger';

import cheerio from 'cheerio';
import axios from 'axios';

async function startBot(){
  const bot: TelegramBot = new TelegramBot(config.bot, {polling: true});
  const app = express();
  /**
   * TODO: Require del loader por default que apunte a expressApp
   * ? More loaders? I think so
  */

  

  app.listen(config.port, () => { 
    Logger.info(`
    -----------------------------------------------
          🔰 Xhiba listening on port: ${config.port} 🔰
    -----------------------------------------------
  `);
    bot.on('polling_error', error => {
      Logger.error(error);
    });
  
    bot.on('message', message => {
      console.log(message);
    });
    
    // Example command flag
    bot.onText(/^\/heya (.+)/, async (message, value) => {
      // Whole programming logic within this section
	bot.sendMessage(message.chat.id, `Hi @${message.from.username}`, {reply_to_message_id: message.message_id});
    });

  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });
}

startBot();
