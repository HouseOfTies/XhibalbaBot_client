/*Here we will be working on the development of Xhiba from an open environment where everyone will be able to contribute their ideas through GH.
Welcome to the 7th.
*/

// Import zone //
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import axios from 'axios';
import ms from 'ms';



// --- Key Chain --- //
dotenv.config();
const botEngineTOKEN = process.env.remote_bot_TOKEN || process.env.local_bot_TOKEN;
const openweatherTOKEN = process.env.remote_openweather_TOKEN || process.env.local_openweather_TOKEN;
const youtubeTOKEN = process.env.remote_youtube_TOKEN || process.env.local_youtube_TOKEN;
const rapidapiTOKEN = process.env.remote_rapidapi_TOKEN || process.env.local_rapidapi_TOKEN;


// --  Bot engine / instance -- //
const bot = new TelegramBot(botEngineTOKEN, {polling: true}); //It will take heroku TOKEN or localToken
console.log("\nRunning bot...");


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
  bot.sendMessage(message.chat.id, `${value[1]}`,{parse_mode : "Markdown",reply_to_message_id : message.message_id});
});

// Whoami command
bot.onText(/\/whoami/, message => {
	const getPhoto = async () => {
		try{
		const photo = await bot.getUserProfilePhotos(message.from.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id),
			userCard = `⚜️ *Perfil usuario* ⚜️\n\n*Usuario:* ${userStats.user.username}\n*First name:* ${userStats.user.first_name}\n*Last name:* ${userStats.user.last_name}\n*Language:* ${userStats.user.language_code}\n*Status:* ${userStats.status}`;
			try{
		bot.sendPhoto(message.chat.id, photo.photos[0][0].file_id, {caption : userCard, parse_mode : "Markdown"});
			}catch(e){bot.sendMessage(message.chat.id, userCard, {parse_mode : "Markdown"});}
	}catch(e){} 
};
	getPhoto();
});

// Whois the user command
bot.onText(/\/whois/, message => {
	const getPhoto = async () => {
		try{
		const photo = await bot.getUserProfilePhotos(message.reply_to_message.from.id),
			userStats = await bot.getChatMember(message.chat.id, message.reply_to_message.from.id),
			userCard = `⚜️ *Perfil usuario* ⚜️\n\n*User Id:* ${message.reply_to_message.from.id}\n*Usuario:* ${userStats.user.username}\n*First name:* ${userStats.user.first_name}\n*Last name:* ${userStats.user.last_name}\n*Language:* ${userStats.user.language_code}\n*Status:* ${userStats.status}`;
			try{
		bot.sendPhoto(message.chat.id, photo.photos[0][0].file_id, {caption : userCard, parse_mode : "Markdown"});}
			catch(e){bot.sendMessage(message.chat.id, useCard, {parse_mode : "Markdown"});}
		}catch(e){}
	}; 
	getPhoto();
});

// - Entertainment - //

// Dice game
bot.onText(/^\/dado (.+)/, (message, value) => {
	if(!isNaN(value[1]) && value[1] < 7 && value[1] > 0){	
		bot.sendMessage(message.chat.id, `Elegiste: *${value[1]}* ¿Cual será el resultado?`,{parse_mode : "Markdown", reply_to_message : message.message_id},);
		bot.sendDice(message.chat.id).then(info =>{
			setTimeout(()=>{
				let res = info.dice.value == value[1] ? bot.sendMessage(message.chat.id, `Oe oeee, le atinaste. 🥳 🎉🎊`,{reply_to_message_id : message.message_id}) : bot.sendMessage(message.chat.id, `No le atinaste, deberías intentarlo otra vez.`,{reply_to_message_id : message.message_id});
			},5000);
		});
	}else{bot.sendMessage(message.chat.id, "Introduce un numero del 1-6",{reply_to_message : message.message_id})}
});

// Weather command
bot.onText(/\/clima (.+)/, (message, value) => {
	const payload = {
		token : `appid=${openweatherTOKEN}`,
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


// Ip searcher
bot.onText(/\/ip (.+)/, (message, value) => {
	var payload = {
 		 method: 'GET',
 		 url: `https://ip-geo-location.p.rapidapi.com/ip/${value[1]}`,
 		 params: {format: 'json', language: 'es'},
  	 headers: {
   		'x-rapidapi-key': rapidapiTOKEN,
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

// - Multimedia commands - //

// Image searcher
bot.onText(/\/img (.+)/, (message, value) => {
	let payload = {
		method : 'GET',
		url : 'https://bing-image-search1.p.rapidapi.com/images/search',
		params : {q : value[1], count : '1'},
		headers : {
			'x-rapidapi-key': rapidapiTOKEN,
    'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
		}
	}
	const getImg = async payload => {
		try{
			let info = await axios.request(payload),
				image = info.data.value[0].contentUrl;
			bot.sendMessage(message.chat.id, `[🔭](${image}) He encontrado esta imagen:\n`, {reply_to_message_id : message.message_id, parse_mode : "Markdown"});
		}catch{
			bot.sendMessage(message.chat.id, "Tuve un error al intentar buscar la foto");
		}
	}
	getImg(payload);
});

// youtube searcher command
bot.onText(/\/yt (.+)/, (message, value) => {
	const apikey = youtubeTOKEN,
		url = decodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${value[1]}&type=video&key=${apikey}`);
		const getVideo = async ()  => {
			try{
			const res = await axios.request(url);
			let video = `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`,
				title = res.data.items[0].snippet.title;
		//Stadistics
			let stadistics = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${res.data.items[0].id.videoId}&key=${apikey}`;
			const statisticRes = await axios.request(stadistics);
			let viewCount = statisticRes.data.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				likeCount = statisticRes.data.items[0].statistics.likeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				dislikeCount = statisticRes.data.items[0].statistics.dislikeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			  commentCount = statisticRes.data.items[0].statistics.commentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				videoCard = `Video solicitado: [▶️](${video})\n\n*${title}*\n\n👁 ${viewCount}\n\n  👍🏼${likeCount}  👎🏼${dislikeCount}\n\n💬 ${commentCount}`;
			bot.sendMessage(message.chat.id, videoCard, {reply_to_message_id : message.message_id, parse_mode : 'Markdown'});	
		}catch{
		bot.sendMessage(message.chat.id,"No he encontrado el video solicitado");
		}
	};
	getVideo();
});

//Urban dictionary command
bot.onText(/\/dic (.+)/, (message, value) => {
	const payload = {
			method: 'GET',
			url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
			params: { term: value[1] },
			headers: {
    		'x-rapidapi-key': rapidapiTOKEN,
    		'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
 	 }
	};
	const getInfo = async () => {
	try{
			const dicReq = await axios.request(payload),
			word = dicReq.data.list[0].word,
			definition = dicReq.data.list[0].definition,
			example = dicReq.data.list[0].example,
			dictionaryCard = `📖 He encontrado en el diccionario:\n\n*Word:* ${word}\n*Definition:* ${definition}\n*Example:* ${example}`
			bot.sendMessage(message.chat.id, dictionaryCard, {reply_to_message : message.message_id, parse_mode : "Markdown"});
		}catch{
			bot.sendMessage(message.chat.id, "No he encontrado la palabra solicitada");
		}
	}
	getInfo();
});

// Archivement command
bot.onText(/\/logro (.+)/, (message, value) => {
	let randomNumber = Math.floor(Math.random()*39+1);
	(async () => {
		let url = await decodeURI(`https://minecraftskinstealer.com/achievement/${randomNumber}/Logro desbloqueado/${value[1]}`);
		bot.sendMessage(message.chat.id, `[🏆](${url})`,{reply_to_message_id : message.message_id, parse_mode : 'Markdown'});
	})();
});


// Full webshot command
bot.onText(/\/fullsnap (.+)/, (message, value) => {
	(async () => {
		const url = await `https://webshot.deam.io/${value[1]}`
		bot.sendMessage(message.chat.id, `[👁‍🗨](${url})Mis ojos han llegado a este lugar.`,{parse_mode : "Markdown"});
	})();
});


// Webshot command
bot.onText(/\/snap (.+)/, (message, value) => {
	(async () => {
		const url = await `https://webshot.deam.io/${value[1]}?height=1000&width=1000`
		bot.sendMessage(message.chat.id, `[👁‍🗨](${url})Mis ojos han llegado a este lugar.`,{parse_mode : "Markdown"});
	})();
});



// -- Adm commands -- //


// Ban user command 
bot.onText(/\/ban (.+)/, (message, value) => {
	if(message.reply_to_message == undefined){
		return;
	}
	const getUser = async () => {
		const user = await bot.getChatMember(message.chat.id, message.from.id);
		if((user.status == 'creator') || (user.status == 'administrator')){
			try{
			bot.kickChatMember(message.chat.id, message.reply_to_message.from.id, {until_date : Math.round((Date.now() + ms(value[1] + " days"))/1000)});
				bot.deleteMessage(message.chat.id, message.message_id);
				bot.sendMessage(message.chat.id, `El usuario ${message.reply_to_message.from.username === undefined ? message.reply_to_message.from.first_name : '@'+message.reply_to_message.from.username} ha sido baneado durante: *${value[1]} dias.*`,{parse_mode : "Markdown"});
			}catch{bot.sendMessage(message.chat.id, `No he podido banear al usuario.`);}
		}else{
			bot.sendMessage(message.chat.id, "No eres administrador.");
		}
	};
	getUser();
});

// Unban user command
bot.onText(/\/unban (.+)/, (message, value) => {
	if(message.reply_to_message == undefined){
		return;
	}
	const getUser = async () => {
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
	getUser();
});



// Pin command 
bot.onText(/\/pin (.+)/, message => {
	(async () =>{
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" ||  botStats.can_pin_messages == false){
			bot.sendMessage(message.chat.id,"No tengo permisos para pinear mensajes. (esto se debe a que no soy administradora { o no tengo permisos para anclar mensajes })");
		}else{
			bot.pinChatMessage(message.chat.id, message.message_id);
			bot.sendMessage(message.chat.id,`Anclado 📌\nPin ID: ${message.message_id}`);
		}
	})();
});

// Unpin command
bot.onText(/\/unpin (.+)/, (message, value) => {
	const unpinMessage = async () => {
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
unpinMessage();
});

// Change title of group command
bot.onText(/\/chtitle (.+)/, (message, value) => {
	(async () => {
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_change_info == false){
			bot.sendMessage(message.chat.id,"No tengo permisos. (esto se debe a que no soy administradora {o no tengo permisos para anclar mensajes} o no eres administrador del grupo.)");
		}else{
			bot.setChatTitle(message.chat.id, value[1]);
			bot.sendMessage(message.chat.id, "He cambiado el titulo de este espacio.");
		}
	})();
});

// Change descripcion command
bot.onText(/\/chdescription (.+)/, (message, value) => {
 (async () => {
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id),
			userStats = await bot.getChatMember(message.chat.id, message.from.id);
		if(botStats.status != "administrator" || userStats.status == "member" ||  botStats.can_change_info == false){
			bot.sendMessage(message.chat.id,"No tengo permisos. (esto se debe a que no soy soy administradora o no tengo permisos de cambiar descripcion) O no eres administrador");
		}else{
			bot.setChatDescription(message.chat.id, value[1]);
			bot.sendMessage(message.chat.id, "He cambiado la descripcion de este espacio.");
		}
 })();
});

// Generate invitation link
bot.onText(/\/invite/, message => {
 (async () => {
		let botInfo = await bot.getMe(),
			botStats = await bot.getChatMember(message.chat.id,botInfo.id);
		if(botStats.status != "administrator" || botStats.can_invite_users == false){
			bot.sendMessage(message.chat.id,"No tengo permisos. (esto se debe a que no soy administradora o no tengo permisos de invitar)");
		}else{
			bot.exportChatInviteLink(message.chat.id);
			let chatInfo = await bot.getChat(message.chat.id);
			bot.sendMessage(message.chat.id, `Aqui tienes un ticket de entrada [🎟](${chatInfo.invite_link})`, {parse_mode : "Markdown"});
		}
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
// -- Bot's end -- //
