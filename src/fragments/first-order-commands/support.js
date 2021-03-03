// Report command
function report(bot, message, value){
	if(message.chat.type == 'private'){
	bot.sendMessage(message.chat.id, "He enviado tu reporte al buzón de reportes");
	bot.sendMessage('-1001268556874', `--- New report ---\n\nUser id: ${message.from.id}\nIs bot?: ${message.from.is_bot}\nFirst name: ${message.from.first_name}\nLast name: ${message.from.last_name}\nUsername: ${message.from.username}\nLanguage code: ${message.from.language_code}\n\nMessage: ${value[1]}`);
	}else{
		bot.sendMessage(message.chat.id, 'Ve a mi privado para realizar reportes, asi sera totalmente anonimo.');
	}
};

export default report