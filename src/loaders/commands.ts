import Logger from './logger';
import { heya, say, rsay, fsay, help, loader, github, imageSearcher, snapshot, weather, wikipedia, youtube } from '@/commands';

export default async ({ bot }) => {
    Logger.info("Commands loaded ✅");
    
    // Example command
    bot.onText(/^\/heya/, async message => {
    // Whole programming logic within this section
        heya(bot, message);
    });

    bot.onText(/^\/say/, async message => {
        say(bot, message);
    });

    bot.onText(/^\/rsay/, async message => {
        rsay(bot, message);
    });

    bot.onText(/^\/fsay/, async message => {
        fsay(bot, message);
    });

    bot.onText(/^\/help/, async message => {
        help(bot, message);
    });

    bot.onText(/^\/github/, async message => {
        github(bot, message);
    });

    bot.onText(/^\/img/, async message => {
        imageSearcher(bot, message);
    });

    bot.onText(/^\/snap/, async message => {
        snapshot(bot, message);
    });

    bot.onText(/(?:^\/weather|^\/clima)/, async message => {
        weather(bot, message);
    });

    bot.onText(/^\/wiki/, async message => {
        wikipedia(bot, message);
    });

    bot.onText(/^\/yt/, async message => {
        youtube(bot, message);
    });

    /* bot.onText(/^\/load/, async message => {
        loader(bot, message);
    }); */
};