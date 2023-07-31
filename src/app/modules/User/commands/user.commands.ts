import { IUser } from "@/app/shared/interfaces/IUser";
import { Telegraf } from "telegraf";
import { UserEntity } from "../repository/user.repository";
import { UserMiddleware } from "@/app/shared/middlewares/userMiddleware";

export class UserCommands {
  userMiddleware: UserMiddleware = new UserMiddleware(this.userRepository);
  checkRegisteredUserMiddleware = this.userMiddleware.checkRegisteredUser.bind(this.userMiddleware)
  usernameValidatorMiddleware = this.userMiddleware.usernameValidator.bind(this.userMiddleware)
  constructor(private bot: Telegraf, private userRepository: UserEntity<IUser>) {
    //this.bot.use(this.userMiddleware.usernameValidator.bind(this.userMiddleware));
  }

  sayHi() {
    this.bot.start(async (ctx) => {
      ctx.reply("Hey yo!");
    });
  }

  signIn() {
    this.bot.command('join', this.usernameValidatorMiddleware , async (ctx) => {
      const userData: IUser = ctx.message.from;
      try {
        const user = await this.userRepository.create(userData);
        ctx.reply(`User @${user.username} registered successfully!`);
        console.log(userData);
      } catch (error) {
        if (error.code === 11000) {
          ctx.reply("You are already registered.");
        } else {
          ctx.reply("Error occurred while registering the user.");
          console.error(error);
        }
      }
    });
  }

  getUser() {
    this.bot.command('info', async (ctx) => {
      const userData: IUser = ctx.message.from;
      try {
        const user = await this.userRepository.findOne(userData.id);
        ctx.reply(`I found this: ${user}`);
      } catch (error) {
        ctx.reply("Error occurred while registering the user.");
        console.error(error);
      }
    });
  }

  leave() {
    this.bot.command('leave', this.checkRegisteredUserMiddleware, async (ctx) => {
      const userData: IUser = ctx.message.from;
      try {
        await this.userRepository.delete(userData.id);
        ctx.reply(`You removed yourself from the database`);
      } catch(error) {
        console.log(error);
      }
    });
  }

  registerCommands() {
    this.sayHi();
    this.signIn();
    this.getUser();
    this.leave();
  }
}
