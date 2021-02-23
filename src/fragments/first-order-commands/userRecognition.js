//Thanks to Roy for the Promise.all() here the documentation => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

// Whoami command
async function whoami(bot,message){
	try {
		const [photo, userStats] = await Promise.all([
		  bot.getUserProfilePhotos(message.from.id, {
			limit: 1,
		  }),
		  bot.getChatMember(message.chat.id, message.from.id),
		]);
		const { status, user: {username, first_name, last_name, language_code}} = userStats;
		const userCard = `⚜️ *Perfil usuario* ⚜️\n\n*Usuario:* ${username}\n*First name:* ${first_name}\n*Last name:* ${last_name}\n*Language:* ${language_code}\n*Status:* ${status}`;
		try {
		  bot.sendPhoto(message.chat.id, photo.photos[0][0].file_id, {
			caption: userCard,
			parse_mode: 'Markdown',
		  });
		} catch (e) {
		  bot.sendMessage(message.chat.id, userCard, { parse_mode: 'Markdown' });
		}
	  } catch (e) {}
};

// Whois Command
async function whois(bot,message){
	try {
		const [photo, userStats] = await Promise.all([
		  bot.getUserProfilePhotos(message.reply_to_message.from.id, {
			limit: 1,
		  }),
		  bot.getChatMember(message.chat.id, message.reply_to_message.from.id),
		]);
		const { status, user: {username, first_name, last_name, language_code}} = userStats;
		const userCard = `⚜️ *Perfil usuario* ⚜️\n\n*Usuario:* ${username}\n*First name:* ${first_name}\n*Last name:* ${last_name}\n*Language:* ${language_code}\n*Status:* ${status}`;  
		try {
		  bot.sendPhoto(message.chat.id, photo.photos[0][0].file_id, {
			caption: userCard,
			parse_mode: 'Markdown',
		  });
		} catch (e) {
		  bot.sendMessage(message.chat.id, userCard, { parse_mode: 'Markdown' });
		}
	  } catch (e) {}
};


export { whoami, whois };