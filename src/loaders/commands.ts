import Logger from './logger';
import { heya, say } from '@/commands';

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
};