import Logger from './logger';
import { heya, say, rsay, fsay, help } from '@/commands';

export default async ({ bot }) => {
    Logger.info("Commands loaded ✅");
    
    // Example command
    bot.onText(/^\/heya/, async (message) => {
    // Whole programming logic within this section
        heya(bot, message);
    });

    bot.onText(/^\/say/, async (message) => {
        say(bot, message);
    });

    bot.onText(/^\/rsay/, async (message) => {
        rsay(bot, message);
    });

    bot.onText(/^\/fsay/, async (message) => {
        fsay(bot, message);
    });

    bot.onText(/^\/help/, async message => {
        help(bot, message);
    });
};