import dotenv from 'dotenv';
dotenv.config({ path: './.env'});

export function botConfig(){
    const TelegramBotToken: string = process.env.remote_bot_TOKEN! || process.env.local_bot_TOKEN!;
    return TelegramBotToken;
};