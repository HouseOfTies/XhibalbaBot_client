import { Telegraf } from "telegraf";
import { Commands } from "./modules/Commands/commands";
import { message } from "telegraf/filters";

export class BotService {
  public loadCommands(bot: Telegraf){
    new Commands().commandsLoader(bot);
    console.log("Commands Loaded ✅");
  }

  public messagesInspector(bot: Telegraf){
    bot.on(message('text'), (ctx) => {
      console.log(ctx.message);
    });
  }
}
