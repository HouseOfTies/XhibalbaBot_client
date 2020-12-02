/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import zone //
import TelegramBot from 'node-telegram-bot-api';

// Bot engine / instance //
const bot = new TelegramBot(process.env.TOKEN, {polling: true});
console.log("\nCorriendo bot & conexiones");

// Errors detector //
bot.on('polling_error', error=>{
	console.log(error);
});

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

bot.onText(/^\/dado (.+)/, (message, value) => {
	if(!isNaN(value[1]) && value[1] < 7){	
		bot.sendMessage(message.chat.id, `Elegiste: *${value[1]}*`,{parse_mode : "Markdown"});
		bot.sendMessage(message.chat.id, `Lanzando dado...`);
		bot.sendDice(message.chat.id).then(info =>{
			setTimeout(()=>{
				let res = info.dice.value == value[1] ? bot.sendMessage(message.chat.id, 'Vaya, le atinaste.') : bot.sendMessage(message.chat.id, 'No le atinaste, suerte la proxima');
			},5000);
		});
	}else{bot.sendMessage(message.chat.id, "Introduce un numero del 1-6")}
});



// -- Second-order Commands -- //

bot.on('message', message => {
	try{
		if(message.new_chat_members != undefined){
			bot.sendMessage(message.chat.id, `Bienvenido a ${message.chat.title}, usuario *${message.new_chat_member.first_name}* esperemos que tu estadia sea fructifera.`,{parse_mode : "Markdown"});
		}
		else if(message.left_chat_member != undefined){
			bot.sendMessage(message.chat.id, `Un alma perteneciente a la oscuridad, siempre termina regresando a ella. *${message.left_chat_member.first_name}* regresa pronto.`,{parse_mode : "Markdown"});
		}
	}catch(error){
		bot.sendMessage(message.chat.id, `He detectado un error ${error.message}`);
	}
});
