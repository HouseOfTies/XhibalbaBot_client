// Welcomes and farewells
bot.on('message', message => {
	try{
		(async () => {
			let botInfo = await bot.getMe(),
				botStats = await bot.getChatMember(message.chat.id,botInfo.id),
				chatInfo = await bot.getChat(message.chat.id);
			if(botStats.status == 'administrator' && message.new_chat_members != undefined){
				bot.sendMessage(message.chat.id, `Bienvenido a *${message.chat.title}*, usuario *${message.new_chat_member.username === undefined ? message.new_chat_member.first_name : '@'+message.new_chat_member.username}* soy quien resguarda este lugar. Recuerda siempre mantenerte al margen con las reglas.`, {parse_mode : "Markdown"});
					
			}else if(botStats.status == 'member' && message.new_chat_member != undefined){
				bot.sendMessage(message.chat.id, `Bienvenido a *${message.chat.title}*, usuario *${message.new_chat_member.username === undefined ? message.new_chat_member.first_name : '@'+message.new_chat_member.username}* esperemos que tu estadia sea fructifera.`,{parse_mode : "Markdown"});
			}else if(message.left_chat_member != undefined){
				bot.sendMessage(message.chat.id, `Un alma perteneciente al vacio siempre termina regresando a el, *${message.left_chat_member.username === undefined ? message.left_chat_member.first_name : '@'+message.left_chat_member.username}* regresa pronto.`,{parse_mode : "Markdown"});
			}
		})();
	}catch(error){
		bot.sendMessage(message.chat.id, "Ha ocurrido un error al recibir o despedir.");
		console.log(error);
	}	
});

bot.on('message',function(message){
    console.log(`\nUser: ${message.from.username} ${message.from.first_name} | ${message.from.id}\nChat: ${message.chat.title} | ${message.chat.username} | ${message.chat.type}\nMessage: ${message.message_id} | ${message.text}\n`);
});