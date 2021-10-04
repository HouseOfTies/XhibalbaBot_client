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
    
    bot.onText(/^\/toktok (.+)/, async (message, value) => {
      const url = `https://isitup.org/${value[1]}`;
      const response = await axios.get(url);
      const $ = await cheerio.load(response.data);
      const title = $('title').html();
      bot.sendMessage(message.chat.id, `🚪Toktok: ${title}`, {reply_to_message_id: message.message_id});
    });

  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });
}

startBot();