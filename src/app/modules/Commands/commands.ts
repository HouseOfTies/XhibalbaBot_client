import { Telegraf } from "telegraf";
import { UserCommands } from "../User/commands/user.commands";
import { Administrator } from "../Administrator/commands/administrator.commands";
import { UserEntity } from "../User/repository/user.repository";
import { IUser } from "@/app/shared/interfaces/IUser";
import { UserModel } from "../User/schema/user.schema";
import { UserRegistratedMiddleware } from "@/app/shared/middlewares/checkUserRegistrated";

export class Commands {
  commandsLoader(bot: Telegraf){
    const userRepository = new UserEntity<IUser>(UserModel);
    new UserCommands(bot, userRepository).registerCommands();
    new Administrator(bot).administratorCommands();
  }
}
