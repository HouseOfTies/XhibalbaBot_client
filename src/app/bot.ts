import { Telegraf } from "telegraf";
import { BotService } from "./bot.service";
import { environment } from "./shared/environment/environment";

export class TelegramBot {
  constructor(private botService: BotService) { }

  private bot: Telegraf = new Telegraf(environment.BOT_TOKEN);

  public botInitializor(): void {
    console.log("Bot initialized ✅");
    this.bot.use(this.botService.setBotLanguages());
    this.botService.loadCommands(this.bot);
    this.botService.messagesInspector(this.bot);
    this.bot.launch();
    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
