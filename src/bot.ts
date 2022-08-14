import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import Logger from "./loaders/logger";

async function startBot() {
  let bot: TelegramBot;
  if (process.env.NODE_ENV === "production") {
    bot = new TelegramBot(config.bot);
    bot.setWebHook(`${config.url}/${config.bot}`);
  } else {
    bot = new TelegramBot(config.bot, { polling: true });
  }
  const app = express();
  const motd = `-----------------------------------------------
                🔰 Xhiba listening on port: ${config.port} 🔰
                Running in ${
                  process.env.NODE_ENV === "production"
                    ? "Production"
                    : "Development"
                } environment
        -----------------------------------------------`;
  // parse the updates to JSON
  app.use(express.json());

  app.get(`/`, (req, res) => {
    res.send("Powered by express");
  });

  // We are receiving updates at the route below!
  app.post(`/${config.bot}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  // Start Express Server
  app
    .listen(config.port, async () => {
      console.log(motd);
      await require("./loaders/commands").default({
        bot: bot,
      });
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });

  bot.on("message", (msg) => {
    console.log(msg);
  });
}

startBot();