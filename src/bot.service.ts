import { Telegraf } from "telegraf";
import { Commands } from "./modules/Commands/commands";

export class BotService {
  public loadCommands(bot: Telegraf){
    new Commands().commandsLoader(bot);
    console.log("Commands Loaded ✅");
  }
}
