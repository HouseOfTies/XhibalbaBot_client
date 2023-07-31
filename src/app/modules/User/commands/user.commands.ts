import { IUser } from "@/app/shared/interfaces/IUser";
import { Telegraf } from "telegraf";
import { UserEntity } from "../repository/user.repository";

export class UserCommands {
  constructor(private bot: Telegraf, private userRepository: UserEntity<IUser>) {}

  sayHi() {
    this.bot.command('hi', (ctx) => ctx.reply('Hey there'))
  }

  sayGoodbye() {
    this.bot.command('bye', (ctx) => ctx.reply('Bye bye'))
  }

  signIn() {
    this.bot.command('signIn', async (ctx) => {
      const userData: IUser = ctx.message.from;
      try {
        const user = await this.userRepository.create(userData);
        ctx.reply(`User ${user.first_name} registered successfully!`);
      } catch (error) {
        ctx.reply("Error occurred while registering the user.");
        console.error(error);
      }
    })
  }

  registerCommands() {
    this.sayHi();
    this.sayGoodbye();
    this.signIn();
  }
}
