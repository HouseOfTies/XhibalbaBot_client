import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
import { BotService } from "./bot.service";
dotenv.config();

export class TelegramBot {
  constructor(private botService: BotService) { }

  private bot: Telegraf = new Telegraf(process.env.BOT_TOKEN);

  public botInitializor(): void {
    console.log("Bot initialized ✅");
    this.botService.loadCommands(this.bot);
    this.bot.on(message('text'), (ctx) => {
      console.log(ctx.message);
    });

    this.bot.launch();

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
