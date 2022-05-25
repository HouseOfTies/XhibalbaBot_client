import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import Logger from "./loaders/logger";

async function startBot() {
  const bot: TelegramBot = new TelegramBot(config.bot, { polling: true });
  const { owner } = config.ownerShip;
  const app = express();
  const motd = `-----------------------------------------------
                🔰 Xhiba listening on port: ${config.port} 🔰
        -----------------------------------------------`;
  let authorized = false; // Initial state without authorized initialization

  app
    .listen(config.port, async() => {
      if(process.env.NODE_ENV == "production"){
        Logger.info(`${motd}
        To charge commands, send the emoji 🗝 (old_key emoji)
        With the owner account
    
        (remember set the owner userId as well as .env.example file is).
      `);
      }else{
        //If bot is in development environment will start automatically
        Logger.info("development environment detected, automatically command load triggered for more confort. <3")
          await require("./loaders/commands").default({
          bot: bot,
        });
      }

      bot.on("polling_error", (error) => {
        Logger.error(error);
      });

      bot.on("message", async (message) => {
        const chatId = message.chat.id;
        //const commands = await bot.getMyCommands();
        console.log(message);

        if (!authorized) {
          if (message.text == "🗝" || message.text == "🔑") {
            if (parseInt(owner) === message.from.id) {
              //Loading the commands here
              await require("./loaders/commands").default({
                bot: bot,
                message: message,
              }); 
              bot.sendMessage(
                chatId,
                "Comandos desbloqueados para el privado y para todos los chats grupales ✅\nPuedes intentar lanzar un comando 👾 \n`⚜️ XHIBA ENGINE RUNNING ⚜️`",
                { parse_mode: "MarkdownV2" }
              );
              authorized = true;
              
            } else {
              bot.sendMessage(
                chatId,
                "No eres mi Owner 👑 o apostol ✝️ para despertarme, mejor no molestes. 💤💤💤"
              );
            }
          }
        }
      });

    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startBot();
