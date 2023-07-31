import { ICommandList } from "@/shared/interfaces/ICommandList";
import { Telegraf } from "telegraf";
import * as CommandList from "@/shared/commandList.json";

export class Administrator {
  commandList: ICommandList[] = CommandList.commands;

  constructor(private bot: Telegraf) { }

  setMyCommands() {
    this.bot.command('setMyCommands', (ctx) => {
      this.bot.telegram.setMyCommands(this.commandList);
      ctx.reply('Commands setted into UI ✅');
    })
  }

  deleteMyCommands() {
    this.bot.command('deleteMyCommands', (ctx) => {
      this.bot.telegram.deleteMyCommands();
      ctx.reply('Commands deleted from UI 🗑️');
    })
  }

  administratorCommands() {
    this.setMyCommands();
    this.deleteMyCommands();
  }
}
