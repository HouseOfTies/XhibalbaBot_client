/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import & unpacking zone //
import TelegramBot from 'node-telegram-bot-api';

import dotenv from 'dotenv';
import ms from 'ms';

import responses from './src/fragments/first-order-commands/responses.js';
import { whoami, whois } from './src/fragments/first-order-commands/userRecognition.js';
import { dice, dart, jackpot } from './src/fragments/first-order-commands/randomGames.js';
import { weather, GitHub, wiki, dictionary, ip } from './src/fragments/first-order-commands/assistance.js';


const { start, heya, help, say, options } = responses;

// --- Key Chain --- //
dotenv.config();
const botEngineTOKEN = process.env.remote_bot_TOKEN || process.env.local_bot_TOKEN;
const youtubeTOKEN = process.env.remote_youtube_TOKEN || process.env.local_youtube_TOKEN;



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
bot.onText(/^\/weather (.+)/, (message,value) => {
	(async() => {
		await weather(bot, message, value);
	})();
});

	//GitHub
bot.onText(/^\/gh (.+)/, (message,value) => {
	(async() => {
		await GitHub(bot, message, value);
	})();
});

	//WikiPedia
bot.onText(/^\/wiki (.+)/, (message,value) => {
	(async() => {
		await wiki(bot, message, value);
	})();
});

	//Ip-searcher
bot.onText(/^\/ip (.+)/, (message,value) => {
	(async() => {
		await ip(bot, message, value);
	})();
});

	//Dictionary
bot.onText(/^\/dic (.+)/, (message,value) => {
	(async() => {
		await dictionary(bot, message, value);
	})();
});


// - Random Games - //

	// Dice Game
bot.onText(/^\/dice (.+)/, (message,value) => {
	(async() => {
		await dice(bot, message, value);
	})();
});
	
	//Dart game
bot.onText(/^\/dart/, (message) => {
	(async() => {
		await dart(bot, message);
	})();
});

	//Bowling game
bot.onText(/^\/bowling/, (message) => {
	(async() => {
		await bowling(bot, message);
	})();
});

	//Jackpot game
bot.onText(/^\/jackpot/, (message) => {
	(async() => {
		await jackpot(bot, message);
	})();
});

// - Multimedia commands - //

	//Img

	//YoutTube

	//Snap
		//FullSnap

	//Logro



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
