import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import Logger from "./loaders/logger";

async function startBot() {
  const bot: TelegramBot = new TelegramBot(config.bot, {
    polling: process.env.NODE_ENV === "production" ? false : true,
  });
  bot.setWebHook(`${config.url}/bot${config.bot}`);
  const app = express();
  const motd = `-----------------------------------------------
                🔰 Xhiba listening on port: ${config.port} 🔰
        -----------------------------------------------`;
  app
    .listen(config.port, async () => {
      console.log(motd);
      await require("./loaders/commands").default({
        bot: bot,
      });

      app.get(`/`, (req, res) => {
        res.send("XhibalbaBot actually running");
      });

      if (process.env.NODE_ENV === "production") {
        app.post(`/${config.bot}`, (req, res) => {
          bot.processUpdate(req.body);
          res.sendStatus(200);
          console.log(req);
        });
      }

      bot.on("polling_error", (error) => {
        Logger.error(error);
      });

      bot.on("message", async (message) => {
        console.log(message);
      });
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startBot();
