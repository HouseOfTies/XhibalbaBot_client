import { Telegraf } from "telegraf";

export class HelloWorld {
  constructor(private bot: Telegraf) { }

  sayHi() {
    this.bot.command('hi', (ctx) => ctx.reply('Hey there'))
  }

  sayGoodbye() {
    this.bot.command('bye', (ctx) => ctx.reply('Bye bye'))
  }

  registerCommands() {
    this.sayHi();
    this.sayGoodbye();
  }
}
