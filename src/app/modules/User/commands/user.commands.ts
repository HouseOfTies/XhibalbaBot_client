import { IUser } from "@/app/shared/interfaces/IUser";
import { Telegraf } from "telegraf";
import { UserEntity } from "../repository/user.repository";
import { UserRegistratedMiddleware } from "@/app/shared/middlewares/checkUserRegistrated";

export class UserCommands {
  userRegistratedMiddleware: UserRegistratedMiddleware = new UserRegistratedMiddleware(this.userRepository);
  constructor(private bot: Telegraf, private userRepository: UserEntity<IUser>) {
    //this.userRegistratedMiddleware = new UserRegistratedMiddleware(userRepository);
    //this.bot.use(userRegistratedMiddleware.checkRegistration.bind(userRegistratedMiddleware));
  }

  sayHi(){
    this.bot.command('hi', this.userRegistratedMiddleware.checkRegistration.bind(this.userRegistratedMiddleware) , async (ctx) => {
      ctx.reply("hello world")
    });
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
    });
  }

  getUser(){
    this.bot.command('findMe', async (ctx) => {
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

  registerCommands() {
    this.sayHi();
    this.signIn();
    this.getUser();
  }
}
