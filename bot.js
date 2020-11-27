/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import zone //

// Bot instance //
import TelegramBot from 'node-telegram-bot-api';

// Bot engine //
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

// S.e.e.d Commands//
console.log("\nCorriendo bot & conexiones");
bot.on("Error catcher: ", function(error){
	console.log(error)
});

bot.onText(/^\/heya/, (msg) => {
	bot.sendMessage(msg.chat.id, "Si, si, estoy viva.");
})

bot.onText(/^\/info/, function(msg){
  	let title = process.title,
    	version = process.versions.node,
    	modules = process.versions.modules,
    	openssl = process.versions.openssl,
    	platform = process.platform,
    	pid = process.pid,
    	ppid = process.ppid;
	bot.sendMessage(msg.chat.id, `🔰System info🔰\n\nRunning in: ${title} 🍃\nVersion: ${version}\nModules: ${modules}\nOpenSSL ${openssl}\nLiving in: ${platform}\nPID: ${pid} READY to kill\nPPID: ${ppid}\nBot version: 0.0.1 s.e.e.d 🌱`);
});
