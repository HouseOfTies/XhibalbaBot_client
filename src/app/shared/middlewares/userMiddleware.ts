import { Context } from "telegraf";
import { IUser } from "../interfaces/IUser";
import { UserEntity } from "@/app/modules/User/repository/user.repository";

export class UserMiddleware {
  constructor(private userRepository: UserEntity<IUser>) { }

  public async checkRegisteredUser(ctx: Context, next: () => void) {
    const userData = ctx.message.from.id;
    const userDataFromDb = await this.userRepository.findOne(userData);

    if (userDataFromDb) {
      return next();
    } else {
      ctx.reply("You are not registered. Please sign in first.");
    }
  }

  public usernameValidator(ctx: Context, next: () => void){
    if(!ctx.message.from.username){
      ctx.reply("You must have a @username to join in the database");
    }else {
      next();
    }
  }
}
