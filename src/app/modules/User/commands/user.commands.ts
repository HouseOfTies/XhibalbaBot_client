import { IUser } from "@/app/shared/interfaces/IUser";
import { Markup, Telegraf } from "telegraf";
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
    this.bot.command('join', this.usernameValidatorMiddleware, async (ctx) => {
      const userData: IUser = ctx.message.from;
      try {
        const user = await this.userRepository.create(userData);
        ctx.reply(`User @${user.username} registered successfully!`);
        console.log(userData);
      } catch (error) {
        if (error.code === 11000) {
          ctx.reply("You are already registered.");
          console.log(error);
        } else {
          ctx.reply("Error occurred while registering the user.");
          console.error(error);
        }
      }
    });
  }

  getUser() {
    this.bot.command('status', async (ctx) => {
      const userData: IUser = ctx.message.from;
      try {
        const user = await this.userRepository.findOne(userData.id);
        const formattedMessage = `
        User Information:
        Username: @${user.username}
        Language: ${user.language_code}
        Koins: ${user.coins} 🪙
      `.replace(/^\s+/gm, '');
        ctx.reply(formattedMessage);
      } catch (error) {
        ctx.reply("Error occurred while registering the user.");
        console.error(error);
      }
    });
  }

  leave() {
    this.bot.command('leave', this.checkRegisteredUserMiddleware, (ctx) => {
      const confirmationKeyboard = Markup.inlineKeyboard([
        Markup.button.callback('Yes, I want delete it', 'confirm'),
        Markup.button.callback('Cancel', 'cancel')
      ]);

      ctx.reply('You really want delete yourself from the database?', confirmationKeyboard);
    });

      this.bot.action('confirm', async (ctx) => {
      const userData: IUser = ctx.from;
      const userId = userData.id;

      try {
        await this.userRepository.delete(userId);
        ctx.answerCbQuery('You has been deleted from the database.');
        await ctx.deleteMessage();
      } catch (error) {
        console.log(error);
      }
    });

    this.bot.action('cancel', (ctx) => {
      ctx.answerCbQuery('Operation canceled, you still living in my memories.');
      ctx.deleteMessage();
    });
  }


  registerCommands() {
    this.sayHi();
    this.signIn();
    this.getUser();
    this.leave();
  }
}
