import { Telegraf } from "telegraf";
import { HelloWorld } from "../User/commands/user.commands";
import { Administrator } from "../Administrator/administrator.commands";

export class Commands {
  commandsLoader(bot: Telegraf){
    new HelloWorld(bot).registerCommands();
    new Administrator(bot).administratorCommands();
  }
}
