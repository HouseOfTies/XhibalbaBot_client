import { ICommandList } from "@/shared/interfaces/ICommandList";
import { Telegraf } from "telegraf";
import * as CommandList  from "@/shared/commandList.json";

export class Administrator {
  commandList: ICommandList[]  = CommandList.commands;

  constructor(private bot: Telegraf) { }

  setMyCommands(){
    this.bot.telegram.setMyCommands(this.commandList);
    this.bot.command('setMyCommands', (ctx) => {
      ctx.reply('Commands setted into UI ✅');
    })
  }

  deleteMyCommands(){
    this.bot.telegram.deleteMyCommands();
    this.bot.command('deleteMyCommands', (ctx) => {
      ctx.reply('Commands deleted from UI 🗑️');
    })
  }

  administratorCommands(){
    this.setMyCommands();
    this.deleteMyCommands();
  }
}
