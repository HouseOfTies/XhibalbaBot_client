import { Context } from "telegraf";
import { IUser } from "../../interfaces/IUser";
import { HttpClientService } from "../../utils/httpClientService";

export class UserMiddleware {
  private baseUrl = '/user';
  constructor(private httpClient: HttpClientService) { }

  public checkRegisteredUser(ctx: Context, next: () => void) {
    const userData: IUser = ctx.message.from;
    this.httpClient.getById(this.baseUrl, userData.id).subscribe(res => {
      if (!res) {
        next();
      } else {
        ctx.reply('You are already registered.');
      }
    });
  }

  public usernameValidator(ctx: Context, next: () => void) {
    if (!ctx.message.from.username) {
      ctx.reply("You must have a @username to join in the database");
    } else {
      next();
    }
  }
}
