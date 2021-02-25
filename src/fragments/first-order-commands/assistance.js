import responses from './responses.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { options } = responses;
const openweatherTOKEN = process.env.remote_openweather_TOKEN || process.env.local_openweather_TOKEN;


// -- Assistance commands -- //
// Weather command
async function weather(bot, message, value){

	const payload = {
		token : `appid=${openweatherTOKEN}`,
		unit : "units=metric",
		lang : "lang=es",
		query : value[1]
	};

	let url = `http://api.openweathermap.org/data/2.5/weather?q=${payload.query}&${payload.unit}&${payload.token}&${payload.lang}`;
	try{
		const res = await axios.get(decodeURI(url));

		const { name, main: { temp, feels_like, temp_min, temp_max, humidity}, sys: { country } } = res.data;
		const { description, icon } = res.data.weather[0];
		
		let weatherCard = `${name}, ${country}\n\n*Temperatura:* ${temp}\n*Temperatura a sentir:* ${feels_like}\n*Temperatura maxima:* ${temp_max}\n*Temperatura minima:* ${temp_min}\n*Humedad:* ${humidity}\n\n Descripcion: ${description}`;
			
		return bot.sendMessage(message.chat.id, weatherCard, options(message));
		}catch(err){
			return bot.sendMessage(message.chat.id, `Introduce una ciudad correcta, eje: Buenos Aires`);
		} 
};


// GitHub accounts searcher
async function GitHub(bot, message, value){
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
};

/* 
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
}); */


export { weather };