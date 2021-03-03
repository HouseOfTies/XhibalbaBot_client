import responses from './responses.js';
const { options } = responses;

// Ban user command 
async function ban(bot, message, value) {
	const user = await bot.getChatMember(message.chat.id, message.from.id);
	if(message.reply_to_message == undefined){
		return;
	}
	if((user.status == 'creator') || (user.status == 'administrator')){
		try{
		bot.kickChatMember(message.chat.id, message.reply_to_message.from.id, {until_date : Math.round((Date.now() + ms(value[1] + " days"))/1000)});
			bot.deleteMessage(message.chat.id, message.message_id);
			bot.sendMessage(message.chat.id, `El usuario ${message.reply_to_message.from.username === undefined ? message.reply_to_message.from.first_name : '@'+message.reply_to_message.from.username} ha sido baneado durante: *${value[1]} dias.*`,options(message));
		}catch{bot.sendMessage(message.chat.id, `No he podido banear al usuario.`, options(message));}
	}else{
		bot.sendMessage(message.chat.id, "No eres administrador.");
	}
};


// Unban user command
async function unban (bot, message){
	if(message.reply_to_message == undefined){
		return;
	}
		const user = await bot.getChatMember(message.chat.id, message.from.id);
		if((user.status == 'creator') || (user.status == 'administrator')){
			try{
			bot.unbanChatMember(message.chat.id, message.reply_to_message.from.id);
				bot.deleteMessage(message.chat.id, message.message_id);
				bot.sendMessage(message.chat.id, `El usuario ${message.reply_to_message.username} ha sido desbaneado. `);
			}catch{bot.sendMessage(message.chat.id, `No he podido desbanear al usuario.`);}
		}else{
			bot.sendMessage(message.chat.id, "No eres administrador.");
	}
};



// Pin command 
async function pin(bot, message){
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" ||  botStats.can_pin_messages == false){
			bot.sendMessage(message.chat.id,"No tengo permisos para pinear mensajes. (esto se debe a que no soy administradora { o no tengo permisos para anclar mensajes })");
		}else{
			bot.pinChatMessage(message.chat.id, message.message_id);
			bot.sendMessage(message.chat.id,`Anclado 📌\nPin ID: ${message.message_id}`);
	}
};

// Unpin command
async function unpin(bot, message, value){
	try{
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_pin_messages == false){
			bot.sendMessage(message.chat.id,"No tengo permisos para despinear mensajes. (esto se debe a que no soy administradora {o no tengo permisos para desanclar mensajes} o no eres un administrador del grupo.)");
		}else{
		  bot.unpinChatMessage(message.chat.id, {message_id : parseInt(value[1])});
			bot.sendMessage(message.chat.id, `Se ha desanclado el mensaje.`, {reply_to_message_id : message.message_id});
			}
		}catch{
			bot.sendMessage(message.chat.id, "No he encontrado el pin a remover.");
		}
};



// Change title of group command
async function chtitle(bot, message, value){
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_change_info == false){
			bot.sendMessage(message.chat.id,"No tengo permisos. (esto se debe a que no soy administradora {o no tengo permisos para anclar mensajes} o no eres administrador del grupo.)");
		}else{
			bot.setChatTitle(message.chat.id, value[1]);
			bot.sendMessage(message.chat.id, "He cambiado el titulo de este espacio.");
		}
};

// Change descripcion command
async function chdescription(bot, message, value){
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_change_info == false){
			bot.sendMessage(message.chat.id,"No tengo permisos. (esto se debe a que no soy soy administradora o no tengo permisos de cambiar descripcion) O no eres administrador");
		}else{
			bot.setChatDescription(message.chat.id, value[1]);
			bot.sendMessage(message.chat.id, "He cambiado la descripcion de este espacio.");
		}
};


// Generate invitation link
async function invite(bot, message){

		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id);
		if(botStats.status != "administrator" || botStats.can_invite_users == false){
			bot.sendMessage(message.chat.id,"No tengo permisos. (esto se debe a que no soy administradora o no tengo permisos de invitar)");
		}else{
			bot.exportChatInviteLink(message.chat.id);
			let chatInfo = await bot.getChat(message.chat.id);
			bot.sendMessage(message.chat.id, `Aqui tienes un ticket de entrada [🎟](${chatInfo.invite_link})`, {parse_mode : "Markdown"});
		}
};


 export { ban, unban, pin, unpin, chtitle, chdescription, invite }
