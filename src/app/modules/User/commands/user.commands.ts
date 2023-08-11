import { IUser } from "@/app/shared/interfaces/IUser";
import { Markup, Telegraf } from "telegraf";
import { UserMiddleware } from "@/app/shared/middlewares/userMiddleware/userMiddleware";
import { HttpClientService } from "@/app/shared/utils/httpClientService";
import { UserService } from "../user.service";

export class UserCommands {
  userMiddleware: UserMiddleware = new UserMiddleware(new HttpClientService);
  checkRegisteredUserMiddleware = this.userMiddleware.checkRegisteredUser.bind(this.userMiddleware)
  usernameValidatorMiddleware = this.userMiddleware.usernameValidator.bind(this.userMiddleware)
  constructor(private bot: Telegraf, private userService: UserService) {
    //this.bot.use(this.userMiddleware.usernameValidator.bind(this.userMiddleware));
  }

  sayHi() {
    this.bot.start(async (ctx) => {
      ctx.reply("Hey yo!");
    });
  }

  join() {
    this.bot.command('join', this.checkRegisteredUserMiddleware, this.usernameValidatorMiddleware, async (ctx) => {
      const userData: IUser = ctx.message.from;
        /* this.userService.createUser(userData).subscribe(_ => {
          ctx.reply('You have been registered successfully');
        }
      ); */
    });
  }

  getStatus() {
    this.bot.command('status', this.checkRegisteredUserMiddleware, async (ctx) => {
      const userData: IUser = ctx.message.from;
      /* try {
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
      } */
    });
  }

  /* leave() {
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
  } */


  registerCommands() {
    this.sayHi();
    this.join();
    this.getStatus();
    //this.getUser();
    //this.leave();
  }
}
