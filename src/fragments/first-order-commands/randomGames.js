import responses from './responses.js';
const { options } = responses;

// Dice game Command
async function dice(bot, message, value) {

	return !isNaN(value[1]) && value[1] < 7 && value[1] > 0 
	
	?
		(
			bot.sendMessage(message.chat.id, `Elegiste: *${value[1]}* ¿Cual será el resultado?`, options(message)),
			bot.sendDice(message.chat.id).then(info =>{
				setTimeout(()=>{
					let res = info.dice.value == value[1] ? bot.sendMessage(message.chat.id, `Oe oeee, le atinaste. 🥳 🎉🎊`,options(message)) : bot.sendMessage(message.chat.id, `No le atinaste, deberías intentarlo otra vez.`,options(message));
				},5000);
			})
		)
	:
		bot.sendMessage(message.chat.id, "Introduce un numero del 1-6", options(message))
	
};

// Dart game Command
async function dart(bot, message) {
	bot.sendMessage(message.chat.id, "Parate recto y toma aire, vas a lanzar un dardo.", options(message));
	bot.sendDice(message.chat.id,{emoji: '🎯'}).then(info =>{
		setTimeout(()=>{
			if (info.dice.value == 6) {
				bot.sendMessage(message.chat.id, "😧 Justo en el blanco, que buen ojo tienes. 🎉🎊",options(message));
			}else if(info.dice.value == 1) {
				bot.sendMessage(message.chat.id, "Que horrible lanzamiento.", options(message));
			}else{
				bot.sendMessage(message.chat.id, `Por un momento pense que acertarías, estuviste cerca.`,options(message));
			}
		},5000);
	});
};


async function jackpot(bot, message) {

	//bot.sendMessage(message.chat.id, "Restare 1֏ de tu inventario por el lanzamiento.", options(message));
	const boll = await bot.sendDice(message.chat.id, {emoji: '🎰'}, options(message));
	console.log(boll.dice.value-1);
};

// 0 = full BAR
// 21 = full grapes 
// 42 = full lemon
// 63 = full 777


// New random games here bellow

export { dice, dart, jackpot };