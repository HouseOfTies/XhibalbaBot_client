const token = require("./apikey/key.js");
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token.token, {polling: true});

console.log("\nCorriendo bot & conexiones");
bot.on("Error catcher", function(error){
	console.log(error)
});

bot.onText(/^\heya/, (msg) => {
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
	bot.sendMessage(msg.chat.id, `🔰System info🔰\n\nRunning in: ${title} 🍃\nVersion: ${version}\nModules: ${modules}\nOpenSSL ${openssl}\nLiving in: ${platform}\nPID: ${pid} READY to kill\nPPID: ${ppid}\nBot version: 0.0.1 seed 🌱`);
});
