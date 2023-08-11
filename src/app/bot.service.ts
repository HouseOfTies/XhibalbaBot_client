import { Telegraf } from "telegraf";
import { Commands } from "./modules/Commands/commands";
import { message } from "telegraf/filters";
import I18n from "telegraf-i18n";
import path from "path";

export class BotService {
  public loadCommands(bot: Telegraf){
    new Commands().commandsLoader(bot);
    console.log("Commands Loaded ✅");
  }

  public messagesInspector(bot: Telegraf){
    bot.on(message('text'), (ctx) => {
      console.log(ctx.message);
    });
  }

  public setBotLanguages(){
    const i18n: I18n = new I18n({
      directory: path.resolve(__dirname, 'shared/locales'),
      defaultLanguage: 'en',
      sessionName: 'botSession',
      useSession: true,
    })

    console.log('Internalization Loaded ✅');
    return i18n.middleware();
  }
}
