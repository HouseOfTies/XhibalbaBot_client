import { Telegraf } from "telegraf";
import { UserCommands } from "../User/commands/user.commands";
import { Administrator } from "../Administrator/commands/administrator.commands";
import { IUser } from "@/app/shared/interfaces/IUser";
import { AdministratorMiddleware } from "@/app/shared/middlewares/administratorMiddleware";
import { DiceGame } from "../NativeGames/DiceGame/diceGame.command";
import { HttpClientService } from "@/app/shared/utils/httpClientService";
import { UserService } from "../User/user.service";

export class Commands {
  commandsLoader(bot: Telegraf){
    new UserCommands(bot, new UserService(new HttpClientService)).registerCommands();
    new Administrator(bot, new AdministratorMiddleware).administratorCommands();
    //new DiceGame(bot).diceGame();
  }
}
