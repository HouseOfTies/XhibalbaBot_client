import { ICommandList } from "@/app/shared/interfaces/ICommandList";
import { Telegraf } from "telegraf";
import * as CommandList from "@/app/shared/commandList.json";
import { AdministratorMiddleware } from "@/app/shared/middlewares/administratorMiddleware";

export class Administrator {
  commandList: ICommandList[] = CommandList.commands;

  constructor(private bot: Telegraf, private administratorMiddleware: AdministratorMiddleware) {
  }

  setMyCommands() {
    this.bot.command('setCommands', this.administratorMiddleware.checkUserAdministrator, (ctx) => {
      this.bot.telegram.setMyCommands(this.commandList);
      ctx.reply('Commands setted into UI ✅');
    })
  }

  deleteMyCommands() {
    this.bot.command('deleteCommands', this.administratorMiddleware.checkUserAdministrator, (ctx) => {
      this.bot.telegram.deleteMyCommands();
      ctx.reply('Commands deleted from UI 🗑️');
    })
  }

  administratorCommands() {
    this.setMyCommands();
    this.deleteMyCommands();
  }
}
