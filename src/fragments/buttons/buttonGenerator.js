function idGenerator(userID){
    return userID + Math.random().toString(16).slice(2)
};

function buttonMaker(message, ...controls){
    return {
		chat_id : message.chat.id,
		parse_mode : "Markdown",
		message_id : message.message_id+1,
        reply_markup: {
			inline_keyboard: [
				controls
			]
		}
	}
}

export { idGenerator, buttonMaker };