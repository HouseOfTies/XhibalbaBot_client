import { BotService } from "@/app/bot.service";
import { TelegramBot } from "./app/bot";
import { MongoDBConnector } from "./app/shared/utils/mongodb-connector";

const mongoDbConn = new MongoDBConnector;
const telegramBot: TelegramBot = new TelegramBot(new BotService);
mongoDbConn.connectDatabase();
telegramBot.botInitializor();
