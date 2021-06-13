/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fs from 'fs';

// --- Key Chain --- //
dotenv.config({ path: '../../.env'});
const TelegramBotToken = process.env.remote_bot_TOKEN || process.env.local_bot_TOKEN;

// --  Bot engine / instance -- //
const bot = new TelegramBot(TelegramBotToken, {polling: true}); //It will take heroku TOKEN or localToken

// - Errors detector - //
bot.on('polling_error', error => {
	const date = new Date();
	fs.writeFileSync('../../tmp/log.txt', `Error detected\n\ndate: ${date}\n${error}`);
	console.log(error);
});

console.log("\nWelcome to the 7th, bot running.\n");


