import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import Logger from './loaders/logger';

async function startBot(){
  const bot: TelegramBot = new TelegramBot(config.bot, {polling: true});
  const app = express();
  
  await require('./loaders').default({ expressApp: app });
  if(process.env.NODE_ENV !== "production") await require('./loaders/commands').default({bot: bot});

  app.listen(config.port, () => { 
    Logger.info(`
    -----------------------------------------------
          🔰 Xhiba listening on port: ${config.port} 🔰
    -----------------------------------------------
    To start commands, send the emoji 🗝
    in your home chat.
  `);
    bot.on('polling_error', error => {
      Logger.error(error);
    });

    bot.on('message', message => {
      console.log(message);
    });

    bot.onText(/^\🗝/, async (message) => {
      const {owner, home} = config.ownerShip;
      if(process.env.NODE_ENV == "production"){
        if(owner === `${message.from.id}` && home === `${message.chat.id}`){
          await require('./loaders/commands').default({
             bot: bot,
             message: message,
            });
          bot.sendMessage(message.chat.id, "Commands loaded in all chat groups and private ✅\nYou can run any command now 👾");
        }else{
          bot.sendMessage(message.chat.id, "Start only in main owner group and my owner/creator");
        }
      }
    });

  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });
}

startBot();
