/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import & unpacking zone //
import TelegramBot from 'node-telegram-bot-api';

import dotenv from 'dotenv';
import axios from 'axios';
import ms from 'ms';

import responses from './src/fragments/first-order-commands/responses.js';
import { whoami, whois } from './src/fragments/first-order-commands/userRecognition.js';

const { start, heya, help, say, options } = responses;

// --- Key Chain --- //
dotenv.config();
const botEngineTOKEN = process.env.remote_bot_TOKEN || process.env.local_bot_TOKEN;
const openweatherTOKEN = process.env.remote_openweather_TOKEN || process.env.local_openweather_TOKEN;
const youtubeTOKEN = process.env.remote_youtube_TOKEN || process.env.local_youtube_TOKEN;
const rapidapiTOKEN = process.env.remote_rapidapi_TOKEN || process.env.local_rapidapi_TOKEN;


// --  Bot engine / instance -- //
const bot = new TelegramBot(botEngineTOKEN, {polling: true}); //It will take heroku TOKEN or localToken
console.log("\nRunning bot...");


// Errors detector //
bot.on('polling_error', error => {
	console.log(error);
});


// -- First-order Commands -- // 
	// - Responses - //
// Start
bot.onText(/^\/start/, message => {
	(async () => {
		await bot.sendMessage(message.chat.id, start, options(message));
	})();
});

// Greetings
bot.onText(/^\/heya/, message => {
	(async () => {
		await bot.sendMessage(message.chat.id, heya, options(message));
	})();
});

// Repeat everything you type
bot.onText(/\/say (.+)/, (message, value) => {
	(async () => {
		await bot.sendMessage(message.chat.id, say(value), options(message));
	})();
});

// Help message
bot.onText(/^\/help/, message => {
	(async () => {
		await bot.sendMessage(message.chat.id, help, options(message));
	})();
});


// - UserRecognition - //

	//Whoami
bot.onText(/^\/whoami/, message => {
	(async() => {
		await whoami(bot,message);
	})();
});

	//Whois
bot.onText(/^\/whois/, message => {
	(async() => {
		await whois(bot,message);
	})();
});



// - Assistance - //

	//Weather

	//GitHub

	//WikiPedia

	//Ip-searcher

	//Dictionary

	//Logro


// - Random Games - //

	// Dice Game


// - Multimedia commands - //

	//Img

	//YoutTube

	//Snap
		//FullSnap



// -- Adm commands -- //

	//Ban

	//UnBan

	//Pin

	//UnPin

	//ChangeTitle

	//ChangeDescription

	//GenerateInvitation


// - Support commands - //

	//Report


// -- Second-order Commands -- Events//
	// Welcome and farewells


// -- Bot's end -- //
