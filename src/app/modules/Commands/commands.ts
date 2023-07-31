import { Telegraf } from "telegraf";
import { UserCommands } from "../User/commands/user.commands";
import { Administrator } from "../Administrator/commands/administrator.commands";
import { UserEntity } from "../User/repository/user.repository";
import { IUser } from "@/app/shared/interfaces/IUser";
import mongoose from "mongoose";
import { UserModel } from "../User/schema/user.schema";

export class Commands {
  commandsLoader(bot: Telegraf){
    new UserCommands(bot, new UserEntity<IUser>(UserModel)).registerCommands();
    new Administrator(bot).administratorCommands();
  }
}
