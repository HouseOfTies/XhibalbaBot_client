/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import zone //
import TelegramBot from 'node-telegram-bot-api';

// Bot engine / instance //
const bot = new TelegramBot(process.env.TOKEN, {polling: true});
console.log("\nCorriendo bot & conexiones");

// -- First-order Commands -- // 

bot.onText(/^\/heya/, msg => {
	bot.sendMessage(msg.chat.id, "Pendiente a todas las ordenes & lista para recibir un comando");
})

bot.onText(/^\/info/, msg => {
	let title = process.title,
		version = process.versions.node,
		modules = process.versions.modules,
		openssl = process.versions.openssl,
		platform = process.platform,
		pid = process.pid,
		ppid = process.ppid;
	bot.sendMessage(msg.chat.id, `🔰System info🔰\n\nRunning in: ${title} 🍃\nVersion: ${version}\nModules: ${modules}\nOpenSSL ${openssl}\nLiving in: ${platform}\nPID: ${pid} READY to kill\nPPID: ${ppid}\nBot version: 0.0.1 s.e.e.d 🌱`);
});


// -- Second-order Commands -- //

bot.on('message', message => {
	try{
		if(message.new_chat_members != undefined){
			bot.sendMessage(message.chat.id, `Bienvenido a ${message.chat.title}, usuario *${message.new_chat_member.first_name}* esperemos que tu estadia sea fructifera.`,{parse_mode : "Markdown"});
		}
		else if(message.left_chat_member != undefined){
			bot.sendMessage(message.chat.id, `Un alma perteneciente a la oscuridad, siempre termina regresando a ella. *${message.left_chat_member.first_name}* regresa pronto.`);
		}
	}catch(error){
		bot.sendMessage(message.chat.id, `He detectado un error ${error.message}`);
	}
});
