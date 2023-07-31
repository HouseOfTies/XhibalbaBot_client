import { BotService } from "@/app/bot.service";
import { TelegramBot } from "./app/bot";

const telegramBot: TelegramBot = new TelegramBot(new BotService);
telegramBot.botInitializor();
