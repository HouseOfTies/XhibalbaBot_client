/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import & unpacking zone //

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const tips = require('./recomendations.json');

import TelegramBot from 'node-telegram-bot-api';

import dotenv from 'dotenv';

import responses from './src/fragments/first-order-commands/responses.js';

import { idGenerator, buttonMaker } from './src/fragments/buttons/buttonGenerator.js';

import { whoami, whois } from './src/fragments/first-order-commands/userRecognition.js';
import { dice, dart, jackpot } from './src/fragments/first-order-commands/randomGames.js';
import { weather, GitHub, wiki, dictionary, ip } from './src/fragments/first-order-commands/assistance.js';
import { ytSearcher, img, snap, fullSnap, logro } from './src/fragments/first-order-commands/multimedia.js';
import { ban, unban, pin, unpin, chtitle, chdescription, invite } from './src/fragments/first-order-commands/administration.js';
import report from './src/fragments/first-order-commands/support.js';
import welcomeAndFarewells from './src/fragments/second-order-commands/welcome-farewells.js';

const { start, heya, help, say, options } = responses;

// --- Key Chain --- //
dotenv.config();
const botEngineTOKEN = process.env.remote_bot_TOKEN || process.env.local_bot_TOKEN;

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

	//Jackpot game
bot.onText(/^\/jackpot/, (message) => {
	(async() => {
		await jackpot(bot, message);
	})();
});

// - Multimedia commands - //

	//Img
bot.onText(/^\/img (.+)/, (message,value) => {
	(async() => {
		await img(bot, message, value, buttonMaker(message, 
			{text: "⬅️ Back", callback_data: idGenerator(message.chat.id)},
			{text: "Next ➡️", callback_data: idGenerator(message.chat.id)}
			));
	})();
});

	//YoutTube
	bot.onText(/^\/yt (.+)/, (message,value) => {
		(async() => {
			await ytSearcher(bot, message, value);
		})();
	});
		
	//Snap
bot.onText(/^\/snap (.+)/, (message,value) => {
	(async() => {
		await snap(bot, message, value);
	})();
});

	//FullSnap
bot.onText(/^\/fullsnap (.+)/, (message,value) => {
	(async() => {
		await fullSnap(bot, message, value);
	})();
});

	//Logro
bot.onText(/^\/logro (.+)/, (message,value) => {
	(async() => {
		await logro(bot, message, value);
	})();
});


// -- Adm commands -- //

	//Ban
bot.onText(/^\/ban/, (message,value) => {
	(async() => {
		await ban(bot, message, value);
	})();
});

	//UnBan
bot.onText(/^\/unban/, message => {
	(async() => {
		await unban(bot, message);
	})();
});

	//Pin
bot.onText(/^\/pin (.+)/, message => {
	(async() => {
		await pin(bot, message);
	})();
});

	//UnPin
bot.onText(/^\/unpin (.+)/, (message,value) => {
	(async() => {
		await unpin(bot, message, value);
	})();
});

	//ChangeTitle
bot.onText(/^\/chtitle (.+)/, (message,value) => {
	(async() => {
		await chtitle(bot, message, value);
	})();
});

	//ChangeDescription
bot.onText(/^\/chdescription (.+)/, (message,value) => {
	(async() => {
		await chdescription(bot, message, value);
	})();
});

	//GenerateInvitation
bot.onText(/^\/invite/, message => {
	(async() => {
		await invite(bot, message);
	})();
});

// - Support commands - //

	//Report
bot.onText(/^\/report (.+)/, (message,value) => {
	(async() => {
		await report(bot, message, value);
	})();
});


https://favqs.com/api/qotd

/*
bot.onText(/^\/test/, message => {
	bot.sendMessage(message.chat.id, "Look the keyboard",{
		reply_to_message_id: message.message_id,
		reply_markup: JSON.stringify({
			keyboard: [
				[
				{
					text: '⚔️ Fight ⚔️'
				},
				{
					text: '🎒 Bag'
				},
				
				{
					text: '🏃🏻‍♀️ Escape'
				}
			]
			],
			resize_keyboard: false,
			selective: true,
		})
	});
});

*/




// -- Second-order Commands -- Events//
	// Welcome and farewells

bot.on('message', message => {
	welcomeAndFarewells(bot, message);
});

bot.on('message', function (message) {
  console.log(
    `\nUser: ${message.from.username} ${message.from.first_name} | ${message.from.id}\nChat: ${message.chat.title} | ${message.chat.username} | ${message.chat.type}\nMessage: ${message.message_id} | ${message.text}\n`
  );
});

setInterval(() => {
	bot.sendMessage(-1001355690950, `Tip: ${tips.recomendations[Object.keys(tips.recomendations)[Math.floor(Math.random()*Object.keys(tips.recomendations).length)]]}`);
}, 1000 * (3600* 4));

setInterval(() => {
	bot.sendMessage(-1001355690950, `¿Te gustan los recursos y ofertas de trabajo que se envían por acá de manera recurrente?, Sabemos que sí. ¿También te gusta la manera en que arreglamos código juntos? Porque a nosotros nos encanta. Comparte para que seamos la inteligencia compartida que supere las inteligencias artificiales. ฅ^•ﻌ•^ฅ ♡

	Enlace: t.me/SoftDevs`);
}, 1000 * (3600 * 12));

// -- Bot's end -- //
