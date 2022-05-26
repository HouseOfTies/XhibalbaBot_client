import Logger from './logger';
import { heya, say, rsay, fsay, help } from '@/commands';

export default async ({ bot }) => {
    Logger.info("Commands loaded ✅");
    
    // Example command
    bot.onText(/^\/heya/, async (message) => {
    // Whole programming logic within this section
        heya(bot, message);
    });

    bot.onText(/^\/say (.+)/, async (message, value) => {
        say(bot, message, value);
    });

    bot.onText(/^\/rsay (.+)/, async (message, value) => {
        rsay(bot, message, value);
    });

    bot.onText(/^\/fsay (.+)/, async (message, value) => {
        fsay(bot, message, value);
    });

    bot.onText(/^\/help/, async message => {
        help(bot, message);
    });
};