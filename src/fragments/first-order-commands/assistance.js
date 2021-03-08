import responses from './responses.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { options, GHTemplate, ipTemplate, dictionaryCard } = responses;

const openweatherTOKEN = process.env.remote_openweather_TOKEN || process.env.local_openweather_TOKEN;
const rapidapiTOKEN = process.env.remote_rapidapi_TOKEN || process.env.local_rapidapi_TOKEN;

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
			return bot.sendMessage(message.chat.id, `Introduce una ciudad correcta, eje: Buenos Aires`, options(message));
		} 
};


// GitHub accounts searcher
async function GitHub(bot, message, value){
	let url = `https://api.github.com/users/${value[1]}`;
			try{
		const info = await axios.get(url);
		bot.sendMessage(message.chat.id, GHTemplate(info), options(message));
			}catch(err){
				bot.sendMessage(message.chat.id, "No se ha podido encontrar la cuenta solicitada.", options(message));
				console.log(err);
			}
	};


// Wikipedia searcher
async function wiki(bot, message, value){
	let url = encodeURI(`https://es.wikipedia.org/api/rest_v1/page/summary/${value[1]}`),
		extract;
	const getWikiInfo = async url => {
		try{
			const info = await axios.get(url);
			const { extract } = info.data;
			bot.sendMessage(message.chat.id, `🔍 Resultado de busqueda:\n\n${extract}`, options(message));
		}catch(e){
			bot.sendMessage(message.chat.id, 'No he podido encontrar lo que buscabas.\nIntenta escribir correctamente tu busqueda.', options(message));
		}
	};
	getWikiInfo(url);
};


// Ip searcher
async function ip(bot, message, value){

	const payload = {
 		 method: 'GET',
 		 url: `https://ip-geo-location.p.rapidapi.com/ip/${value[1]}`,
 		 params: {format: 'json', language: 'es'},
  	 headers: {
   		'x-rapidapi-key': rapidapiTOKEN,
    	'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com'
  	}
};
		try{
			const info = await axios.request(payload);
			bot.sendMessage(message.chat.id, ipTemplate(info), options(message));
		}catch(e){
			console.log(e);
			bot.sendMessage(message.chat.id, 'No he encontrado la direccion ip solicitada', options(message));
		}
};



//Urban dictionary command
async function dictionary(bot, message, value){
	const payload = {
			method: 'GET',
			url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
			params: { term: value[1] },
			headers: {
    		'x-rapidapi-key': rapidapiTOKEN,
    		'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
 	 }
	};
	try{
			const request = await axios.request(payload);
			const { word, definition, example } = request.data.list[0];
			bot.sendMessage(message.chat.id, dictionaryCard(word,definition,example), options(message));
		}catch{
			bot.sendMessage(message.chat.id, "No he encontrado la palabra solicitada", options(message));
		}
	};


export { weather, GitHub, wiki, ip, dictionary };