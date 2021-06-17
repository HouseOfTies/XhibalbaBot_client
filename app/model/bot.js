/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';
import { DBhelper } from '../helpers/DBhelper.js';
import { botMessagesHelper } from '../helpers/botMessagesHelper.js';

// --- Key Chain --- //
dotenv.config({ path: '../../.env'});
const TelegramBotToken = process.env.remote_bot_TOKEN || process.env.local_bot_TOKEN;

// --  Bot engine / instance -- //
const bot = new TelegramBot(TelegramBotToken, {polling: true}); //It will take heroku TOKEN or localToken
const PORT = 8080;
const HOST = '0.0.0.0';

// - Errors detector - //
bot.on('polling_error', error => {
	const date = new Date();
	fs.writeFileSync('../../tmp/log.txt', `Error detected\n\ndate: ${date}\n${error}`);
	console.log(error);
});

const app = express();
app.get('/', (req, res) => {
  res.send('Welcome to 7th inside system, this message is to show the bot is running already.');
});

app.listen(PORT, HOST);
console.log(`\nBot running on http://${HOST}:${PORT}`, '\nWelcome to the 7th, bot running.\n');


bot.on('message', (message) => {
  	botMessagesHelper(bot, message).messageLog();
});
