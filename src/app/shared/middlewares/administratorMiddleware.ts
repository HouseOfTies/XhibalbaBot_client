import { Context } from "telegraf";
import { environment } from "../environment/environment";

export class AdministratorMiddleware {

  checkUserAdministrator(ctx: Context, next: () => void){
    const userId = ctx.message.from.id;
    if(userId !== parseInt(environment.OWNER_ID)){
      ctx.reply("You cant use this command because you are not an Administrator");
    }else {
      next();
    }
  }
}
