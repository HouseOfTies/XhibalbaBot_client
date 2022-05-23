import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import Logger from "./loaders/logger";

async function startBot() {
  const bot: TelegramBot = new TelegramBot(config.bot, { polling: true });
  const app = express();
  let started = false;

  app
    .listen(config.port, () => {
      Logger.info(`
    -----------------------------------------------
          🔰 Xhiba listening on port: ${config.port} 🔰
    -----------------------------------------------
    To start commands, send the emoji 🗝 (old_key)
    in your home chat.
  `);

      bot.on("polling_error", (error) => {
        Logger.error(error);
      });

      bot.on("message", async (message) => {
        const chatId = message.chat.id;
        const { owner, home } = config.ownerShip;

        console.log(message);

        if (!started) {

          if(message.text == "🗝️"){
            bot.sendMessage(chatId, "Acabo de despertar");
          }

          started = true;

        } else {
          bot.sendMessage(chatId, "Estoy despierta, estoy despierta.", {reply_to_message_id : message.message_id });
        }
      });
      
      /* if (process.env.NODE_ENV !== "production") {
        bot.onText(/^\🗝/, async (message) => {
          const { owner, home } = config.ownerShip;

          if (owner === `${message.from.id}` && home === `${message.chat.id}`) {
            await require("./loaders/commands").default({
              bot: bot,
              message: message,
            });
            bot.sendMessage(
              message.chat.id,
              "Commands loaded in all chat groups and private ✅\nYou can run any command now 👾 \n`⚜️ ALREADY RUNNING ⚜️`",
              {parse_mode : "MarkdownV2"}
            );
          } else {
            bot.sendMessage(
              message.chat.id,
              "I'm sleeping, I'll start only with the voice of my creator in my home. 💤💤💤"
            );
          }
        });
      } */
      

    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startBot();
