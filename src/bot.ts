import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
dotenv.config();

export class TelegramBot {
  private static instance: TelegramBot | null = null;

  static getInstance(): TelegramBot {
    if (!TelegramBot.instance) {
      TelegramBot.instance = new TelegramBot();
    }
    return TelegramBot.instance;
  }

  bot: Telegraf = new Telegraf(process.env.BOT_TOKEN);
  botInitializor() {
    this.bot.on(message('text'), (ctx) => {
      console.log(ctx);
    });

    this.bot.launch();

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
