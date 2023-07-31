import { BotService } from "@/bot.service";
import { TelegramBot } from "./src/bot";

const telegramBot: TelegramBot = new TelegramBot(new BotService);
telegramBot.botInitializor();
