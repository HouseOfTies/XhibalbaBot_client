/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import zone //
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import axios from 'axios';

// Bot engine / instance //
dotenv.config();
const bot = new TelegramBot(process.env.TOKEN || process.env.localToken, {polling: true}); //It will take heroku TOKEN or localToken
console.log("\nCorriendo bot & conexiones");

// Errors detector //
bot.on('polling_error', error=>{
	console.log(error);
});

// -- First-order Commands -- // 
// Greetings
bot.onText(/^\/heya/, message => {
	bot.sendMessage(message.chat.id, "Pendiente a todas las ordenes & lista para recibir un comando");
});

// Repeat everything you type
bot.onText(/\/say (.+)/, (message, value) => {
  bot.sendMessage(message.chat.id, `${value[1]}`,{reply_to_message_id : message.message_id});
});


//Two arguments command test
bot.onText(/\/test (.+) (.+)/, (message, value) => {
  bot.sendMessage(message.chat.id, `Tiempo: ${value[2]}\nNota: ${value[1]}`);
});

// Dice game
bot.onText(/^\/dado (.+)/, (message, value) => {
	if(!isNaN(value[1]) && value[1] < 7){	
		bot.sendMessage(message.chat.id, `Elegiste: *${value[1]}*`,{parse_mode : "Markdown"});
		bot.sendMessage(message.chat.id, `Lanzando dado...`);
		bot.sendDice(message.chat.id).then(info =>{
			setTimeout(()=>{
				let res = info.dice.value == value[1] ? bot.sendMessage(message.chat.id, `Vaya, le atinaste. 🎉🎊`,{reply_to_message_id : message.message_id}) : bot.sendMessage(message.chat.id, `No le atinaste, suerte la proxima.`,{reply_to_message_id : message.message_id});
			},5000);
		});
	}else{bot.sendMessage(message.chat.id, "Introduce un numero del 1-6")}
});

// Weather command
bot.onText(/\/clima (.+)/, (message, value) => {
	const payload = {
		token : "appid=4bd7d205123e24502a47a7812095629d",
		unit : "units=metric",
		lang : "lang=es"
	};
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${value[1]}&${payload.unit}&${payload.token}&${payload.lang}`;
	const getWeather = async url => {
		try{
			const res = await axios.get(decodeURI(url));
			bot.sendMessage(message.chat.id,
				` ${res.data.name}, ${res.data.sys.country}\n
*Temperatura:* ${res.data.main.temp}
*Temperatura a sentir:* ${res.data.main.feels_like}
*Temperatura maxima:* ${res.data.main.temp_max}
*Temperatura minima:* ${res.data.main.temp_min}
*Humedad: * ${res.data.main.humidity}%
*Descripcion* ${res.data.weather[0].description}
					`,
				{parse_mode : "Markdown"}
			);
		}catch(err){
			bot.sendMessage(message.chat.id, `Introduce una ciudad correcta, eje: Buenos Aires`);
		}
	};
	getWeather(url);
});

//GitHub accounts searcher
bot.onText(/^\/gh (.+)/, (message, value) => {
	let url = `https://api.github.com/users/${value[1]}`;
		const getInfo = async url => {
			try{
		const info = await axios.get(url);
		bot.sendMessage(message.chat.id, 
		`_GitHub Profile_ 😺\n
*Name:* ${info.data.name}

------ Primary info
*User:* ${info.data.login}
*User ID:* ${info.data.node_id}
*Pic:* ${info.data.avatar_url}.jpg
*Type:* ${info.data.type}
*Url:* ${info.data.html_url}
*Bio:* ${info.data.bio}
*Public repos:* ${info.data.public_repos}

------ Secondary info
*Followers:* ${info.data.followers}
*Following:* ${info.data.following}
*location:* ${info.data.location}
*company:* ${info.data.company}

------ Others
*Created at:* ${info.data.created_at}
*Last update:* ${info.data.updated_at}
			`,{parse_mode : "Markdown"});
			}catch(err){
				bot.sendMessage(message.chat.id, "No se ha podido encontrar la cuenta solicitada.");
			}
	};
	getInfo(url);
});


//Wikipedia searcher
bot.onText(/\/wiki (.+)/, (message, value) => {
	let url = encodeURI(`https://es.wikipedia.org/api/rest_v1/page/summary/${value[1]}`),
		extract;
	const getWikiInfo = async url => {
		try{
			const info = await axios.get(url);
			extract = info.data.extract;
			bot.sendMessage(message.chat.id, `🔍 Resultado de busqueda:\n\n${extract}`, {reply_to_message_id : message.message_id});
		}catch(e){
			bot.sendMessage(message.chat.id, 'No he podido encontrar lo que buscabas.\nIntenta escribir correctamente tu busqueda.',{reply_to_message_id : message.message_id});
		}
	};
	getWikiInfo(url);
});

//Image searcher
bot.onText(/\/img (.+)/, (message, value) => {
	let payload = {
		method : 'GET',
		url : 'https://bing-image-search1.p.rapidapi.com/images/search',
		params : {q : value[1], count : '1'},
		headers : {
			'x-rapidapi-key': 'e486b8885bmshff68b752d62f77fp181960jsnc4e96d1307ea',
    'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
		}
	}
	const getImg = async payload => {
		let info = await axios.request(payload),
			image = info.data.value[0].contentUrl;
		bot.sendMessage(message.chat.id, `[🔭](${image}) He encontrado esta imagen:\n`, {reply_to_message_id : message.message_id, parse_mode : "Markdown"});
	}
	getImg(payload);
});

// Info about the bot
bot.onText(/^\/info/, message  => {
	let title = process.title,
		version = process.versions.node,
		modules = process.versions.modules,
		openssl = process.versions.openssl,
		platform = process.platform,
		pid = process.pid,
		ppid = process.ppid;
	bot.sendMessage(message.chat.id, `🔰System info🔰\n\nRunning in: ${title} 🍃\nVersion: ${version}\nModules: ${modules}\nOpenSSL ${openssl}\nLiving in: ${platform}\nPID: ${pid} READY to kill\nPPID: ${ppid}\nBot version: 0.0.1 s.e.e.d 🌱`);
});

// -- Second-order Commands -- Events//

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
