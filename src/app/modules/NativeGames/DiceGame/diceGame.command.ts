import { UserMiddleware } from "@/app/shared/middlewares/userMiddleware";
import { Telegraf } from "telegraf";
import { UserEntity } from "../../User/repository/user.repository";
import { IUser } from "@/app/shared/interfaces/IUser";

export class DiceGame {
  userMiddleware: UserMiddleware = new UserMiddleware(this.userRepository);
  checkRegisteredUserMiddleware = this.userMiddleware.checkRegisteredUser.bind(this.userMiddleware)

  coins: any;

  private multiplier: Array<number> = [2, 3, 4, 5];

  constructor(private bot: Telegraf, private userRepository: UserEntity<IUser>) { }

  public throwDiceGame() {
    //Throw the dice game
    this.bot.command('dice', this.checkRegisteredUserMiddleware, async (ctx) => {
      const messageText = ctx.message.text || '';
      const commandParams = messageText.split(' ');
      const betAmount = parseInt(commandParams[1], 10);
      const diceNumber = parseInt(commandParams[2], 10);
      const randomMultiplier = this.multiplier[Math.floor(Math.random() * this.multiplier.length)]

      const userData: IUser = ctx.message.from;

      try {
        this.coins = (await this.userRepository.findOne(userData.id)).coins;
      } catch (error) {
        ctx.reply("Error occurred while registering the user.");
        console.error(error);
        return;
      }

      if (commandParams.length !== 3) {
        ctx.reply("Invalid parameters. Usage: /dice <bet_amount> <dice_number>");
        return;
      }

      if (isNaN(betAmount) || isNaN(diceNumber) || diceNumber < 1 || diceNumber > 6) {
        ctx.reply("Invalid parameters. The bet amount must be a valid number, and the dice number must be between 1 and 6.");
        return;
      }

      if (betAmount <= 0) {
        ctx.reply("Invalid bet amount. The bet amount must be greater than zero.");
        return;
      }

      await ctx.replyWithDice(/* { emoji: "🎰"} */).then(replyCtx => {
        console.log(replyCtx);
        ctx.reply(`Dice result: ${replyCtx.dice.value}`);
        if (replyCtx.dice.value === diceNumber) {
          const reward = betAmount * randomMultiplier;
          const formattedMessage = `
          Congratulations, you won. 🎉
          --- Result --
          Bet amount: ${betAmount} 🪙
          Random Multiplier: X${randomMultiplier}
          Reward: ${reward} 🪙
          -------------
          Total Koins: ${this.coins + reward} 💰
          `.replace(/^\s+/gm, '');
          this.userRepository.update(ctx.message.from.id, { coins: this.coins + reward})
          ctx.reply(formattedMessage);
        } else {
          this.userRepository.update(ctx.message.from.id, { coins: this.coins - betAmount});
          ctx.reply(`You will loose: -${betAmount} 🪙`);
        }
      });
    });
  }

  diceGame() {
    this.throwDiceGame();
  }
}
