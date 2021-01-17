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
var alias = {};

// Errors detector //
bot.on('polling_error', error=>{
	console.log(error);
});

// -- First-order Commands -- // 
// Start
bot.onText(/^\/start/, message => {
	bot.sendMessage(message.chat.id, "Empieza usando uno de mis comandos, la manera correcta de escribirlos es con /comando [argumento]\nEjemplo: /clima santo domingo");
});

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
  bot.sendMessage(message.chat.id, `Argumento1: ${value[1]}\nArgumento2: ${value[2]}`);
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

// GitHub accounts searcher
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


// Wikipedia searcher
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

// Image searcher
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


// Ip searcher
bot.onText(/\/ip (.+)/, (message, value) => {
	var payload = {
 		 method: 'GET',
 		 url: `https://ip-geo-location.p.rapidapi.com/ip/${value[1]}`,
 		 params: {format: 'json', language: 'es'},
  	 headers: {
   		'x-rapidapi-key': 'e486b8885bmshff68b752d62f77fp181960jsnc4e96d1307ea',
    	'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com'
  	}
};
	const getIpInfo = async payload => {
		try{
			let info = await axios.request(payload);
			bot.sendMessage(message.chat.id, `
🕵🏻‍♀️ He encontrado algo.\n
------ Info ------
--- Area ---
*Codigo*: ${info.data.area.code}
*Geonombre id*: ${info.data.area.geonameid}
*Nombre*: ${info.data.area.name}

--- ASN ---
*Numero*: ${info.data.asn.number}
*Organizacion*: ${info.data.asn.organisation}

--- Region --
*Latitud/Longitud*: ${info.data.location.latitude} / ${info.data.location.longitude}
*Ciudad*: ${info.data.city.name}
*Poblacion*: ${info.data.city.population}
*Capital*: ${info.data.country.capital}
*Codigo telefonico* ${info.data.country.phone_code}
*Moneda*: ${info.data.currency.code} | ${info.data.currency.name}
*Contienente*: ${info.data.continent.name}

--- Seguridad ---
*Es crawler*: ${info.data.security.is_crawler}
*Es proxy*: ${info.data.security.is_proxy}
*Es thread*:${info.data.security.is_thread}
*Es tor*: ${info.data.security.is_tor}

--- Tipo ---
${info.data.type}
				`,{parse_mode : "Markdown", reply_to_message_id : message.message_id});
		}catch(e){
			bot.sendMessage(message.chat.id, 'No he encontrado la direccion ip solicitada');
		}
	};
getIpInfo(payload);
});


bot.onText(/\!yt (.+)/, (message,value) =>{
	let payload = {
		method : 'GET',
		url : 'https://youtube-v31.p.rapidapi.com/search',
		params : {
			q : `${value[1]}`,
			part : 'snippet,id',
			regionCode: 'DO',
			maxResults : '1',
			order : 'relevance'
		},
		headers: {
    'x-rapidapi-key': 'e486b8885bmshff68b752d62f77fp181960jsnc4e96d1307ea',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
 		}
	};
(async () => {
	const ytReq = await axios.request(payload);
	let videoId = `[🔍](https://www.youtube.com/watch?v=${ytReq.data.items[0].id.videoId}) Video solicitado:`;
	bot.sendMessage(message.chat.id, videoId,{reply_to_message_id : message.message_id, parse_mode : 'Markdown'});
	})();
});

// Experimental

// Say alias (nickname)
bot.onText(/\!alias/, message => {
	bot.sendMessage(message.chat.id, `Te conozco bajo el nombre de: ${alias.message.from.id}`, {reply_to_message_id : message.message_id});
});

// Set new alias (nickname)
bot.onText(/\!setalias (.+)/, (message, value) => {
  alias [ `${message.from.id}` ] = `${value[1]}`;
  bot.sendMessage(message.chat.id, `Bien, ahora te conocere bajo el nombre de ${value[1]}.`,{reply_to_message_id : message.message_id, parse_mode : 'Markdown'});
});


// Archivement command
bot.onText(/\/logro (.+)/, (message, value) => {
	let randomNumber = Math.floor(Math.random()*39+1);
	(async () => {
		let url = await decodeURI(`https://minecraftskinstealer.com/achievement/${randomNumber}/Logro desbloqueado/${value[1]}`);
		bot.sendMessage(message.chat.id, `[🏆](${url})`,{reply_to_message_id : message.message_id, parse_mode : 'Markdown'});
	})();
});


// -- Adm commands -- //

// Pin command 
bot.onText(/\!pin (.+)/, (message, value) => {
	(async () =>{
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		console.log(userStats);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_pin_messages == false){
			bot.sendMessage(message.chat.id,"No tengo permisos para pinear mensajes. (esto se debe a que no soy administradora {o no tengo permisos para anclar mensajes} o no eres un administrador del grupo)");
		}else{
			bot.pinChatMessage(message.chat.id, message.message_id);
			bot.sendMessage(message.chat.id,`Anclado 📌\nPin ID: ${message.message_id}`);
		}
	})();
});

// Unpin command
bot.onText(/\!unpin (.+)/, (message, value) => {
	(async () =>{
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_pin_messages == false){
			bot.sendMessage(message.chat.id,"No tengo permisos para despinear mensajes. (esto se debe a que no soy administradora {o no tengo permisos para anclar mensajes} o no eres un administrador del grupo)");
		}else{
			bot.sendMessage(message.chat.id, `Se ha desanclado el mensaje.`, {reply_to_message_id : message.message_id});
		}
	})();
});

// Send Poll
//bot.onText(/\!poll (.+)/, (message, value) => {
//	const options = [];
//	(async () => {
//		const updates = await bot.getUpdates();
//			console.log(updates[0].message.from.id);
//				while(`${value[1]}` != "stop"){
//					if(message.from.id == updates[0].message.from.id){
//						options.push(`${value[1]}`);
//					}
//				}
//				console.log(options);
//			//bot.sendPoll(message.chat.id,`${value[1]}`,options,{is_anonymous : false});
//	})();
//});

// Change title of group command
bot.onText(/\/chtitle (.+)/, (message, value) => {
 (async () => {
		bot.setChatTitle(message.chat.id, value[1]);
	 	bot.sendMessage(message.chat.id, "He cambiado el titulo de este espacio.");
 })();
});

bot.onText(/\/chdescription (.+)/, (message, value) => {
 (async () => {
		bot.setChatDescription(message.chat.id, value[1]);
	 	bot.sendMessage(message.chat.id, "He cambiado la descripcion de este espacio.");
 })();
});

bot.onText(/\/getadm/, message => {
 (async () => {
		const adms = await bot.getChatAdministrators(message.chat.id);
	 	console.log(adms);
 })();
});



//Support commands
// Help message
bot.onText(/^\/help/, message => {
	bot.sendMessage(message.chat.id, `Saludos, viajero. Soy *Xhibalba*, poseedora de las ruinas del inframundo. Por lo que veo, no sabes bien como funcionan estas cosas asi que dejame explicarte brevemente.\nPresiona el caracter / para acceder a mi menu de comandos.\nMuchos de mis comandos para poder ser ejecutados requieren de un argumento [arg] el cual puede ser numerico o de letras segun el comando que ejecutes, *ejemplo:*\n/clima santiago o /dado 2\n\nSi necesitas ayuda o has encontrado algun bug 🐞o usuario que manche mi pureza, puedes escribirle a mi creador [ZeroSeven](https://t.me/ZeroSeventty) Haciendo click sobre su nombre.\n\nComo tambien puedes mandar un reporte al buzon haciendo uso del comando /report tu reporte.`,{reply_to_message_id : message.message_id, parse_mode : "Markdown"});
});

// Report command
bot.onText(/\/report (.+)/, (message, value) =>{
	if(message.chat.type == 'private'){
	bot.sendMessage(message.chat.id, "He enviado tu reporte al buzón de reportes");
	bot.sendMessage('-1001268556874', `--- New report ---\n\nUser id: ${message.from.id}\nIs bot?: ${message.from.is_bot}\nFirst name: ${message.from.first_name}\nLast name: ${message.from.last_name}\nUsername: ${message.from.username}\nLanguage code: ${message.from.language_code}\n\nMessage: ${value[1]}`);
	}else{
		bot.sendMessage(message.from.id, 'Solo puedes realizar reportes desde aqui.');
	}
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
