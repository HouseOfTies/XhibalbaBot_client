import responses from './responses.js';
const { options } = responses;

// Dice game Command
async function dice(bot, message, value) {

	return !isNaN(value[1]) && value[1] < 7 && value[1] > 0 
	
	?
		(
			bot.sendMessage(message.chat.id, `Elegiste: *${value[1]}* ¿Cual será el resultado? (-50 DC por lanzamiento)`, options(message)),
			bot.sendDice(message.chat.id).then(info =>{
				setTimeout(()=>{
					let res = info.dice.value == value[1] ? bot.sendMessage(message.chat.id, `Oe oeee, le atinaste. 🥳 🎉🎊 Ganas 100 DC`,options(message)) : bot.sendMessage(message.chat.id, `No le atinaste, deberías intentarlo otra vez.`,options(message));
				},5000);
			})
		)
	:
		bot.sendMessage(message.chat.id, "Introduce un numero del 1-6", options(message))
	
};

// Dart game Command
async function dart(bot, message) {
	bot.sendMessage(message.chat.id, "Parate recto y toma aire, vas a lanzar un dardo. *(-25₰ DC por lanzamiento de dardo.)*", options(message));
	bot.sendDice(message.chat.id,{emoji: '🎯'}).then(info =>{
		setTimeout(()=>{

			const prizes = {
				fail : {description : "Dardo fallido", value : 0},
				redCircle : {description : "Primera diana roja", value: 25},
				whiteCircle : {description : "Primera diana blanca", value: 30},
				redCircle2 : {description : "Segunda diana roja", value: 35},
				whiteCircle2 : {description : "Segunda diana blanca", value: 40},
				center : {description : "Justo en el blanco 🎉", value: 50}
			}

			switch (info.dice.value) {
				case 1:
					bot.sendMessage(message.chat.id, `${prizes.fail.description}. Que horrible lanzamiento, podrias causar un accidente.`, options(message));
					break;
				case 2:
					bot.sendMessage(message.chat.id, `${prizes.redCircle2.description} ganas ${prizes.redCircle.value} DC`);
					break;
				case 3:
					bot.sendMessage(message.chat.id, `${prizes.whiteCircle2.description} ganas ${prizes.whiteCircle.value} DC`);
					break;
				case 4:
					bot.sendMessage(message.chat.id, `${prizes.redCircle.description} ganas ${prizes.redCircle2.value} DC`);
					break;
				case 5:
					bot.sendMessage(message.chat.id, `${prizes.whiteCircle.description} ganas ${prizes.whiteCircle2.value} DC`);
					break;
				case 6:
					bot.sendMessage(message.chat.id, `${prizes.center.description} ganas ${prizes.center.value} DC`);
					break;
					
				default:
					break;
			}
		},5000);
	});
};


async function jackpot(bot, message) {

	bot.sendMessage(message.chat.id, "Restare 1֏ de tu inventario por el lanzamiento.", options(message));
	bot.sendDice(message.chat.id, {emoji: '🎰'}, options(message)).then(info => {
		setTimeout(() => {

			const value = info.dice.value;

			const prizes = {
				bar: {value : 1, price : 100},
				grapes: {value : 22, price : 300},
				lemon: {value : 43, price : 600},
				jackpot777: {value : 64, price : 1000}
			}

			switch (value) {
				case prizes.bar.value:
					bot.sendMessage(message.chat.id, `*BAR* recibes ${prizes.bar.price} DC`,options(message));
					break;
				case prizes.grapes.value:
					bot.sendMessage(message.chat.id, `*GRAPES* recibes ${prizes.grapes.price} DC`,options(message));
					break;
				case prizes.lemon.value:
					bot.sendMessage(message.chat.id, `*LEMONS* recibes ${prizes.lemon.price} DC`,options(message));
					break;
				case prizes.jackpot777.value:
					bot.sendMessage(message.chat.id, `*JACKPOT!!!* 🎉 recibes ${prizes.jackpot777.price} DC`,options(message));
					break;
				default:
					bot.sendMessage(message.chat.id, "No ganas nada.");
					break;
			}
			console.log(value);

		}, 3000);
	});
};

// 1 = full BAR
// 22 = full grapes 
// 43 = full lemon
// 64 = full 777


// New random games here bellow

export { dice, dart, jackpot };