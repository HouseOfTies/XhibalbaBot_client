import responses from './responses.js';
import dotenv from 'dotenv';
import axios from 'axios';
import request from 'request';

dotenv.config();

const youtubeTOKEN = process.env.remote_youtube_TOKEN || process.env.local_youtube_TOKEN;
const rapidapiTOKEN = process.env.remote_rapidapi_TOKEN || process.env.local_rapidapi_TOKEN;

const { options } = responses;


// Image searcher
async function imgSearcher(value, index){
	const payload = {
		method : 'GET',
		url : 'https://bing-image-search1.p.rapidapi.com/images/search',
		params : {q : value[1], count : '100'},
		headers : {
			'x-rapidapi-key': 'e486b8885bmshff68b752d62f77fp181960jsnc4e96d1307ea',
    'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
		}
	};
		const info = await axios.request(payload);
		
		return `[🔭](${info.data.value[index].contentUrl}) He encontrado esta imagen:\n`;

};

async function img(bot, message, value, buttons) {
	let index = 0;
	const image = await imgSearcher(value, index);
	bot.sendMessage(message.chat.id, image, options(message));
	/* bot.on('callback_query', function onCallbackQuery(button){
		if(button.data == 'next'){
			index++;
			bot.editMessageText(index, buttons);
		}
		if(button.data == 'back'){
			index--;
			if(index < 0){
				bot.editMessageText("No puedo ir mas atras, intenta ir a la siguiente.", replyDecorator);
			}else{
				bot.editMessageText(index, buttons);
			}
		}
	});	  */
}



// youtube searcher command
async function ytSearcher(bot, message, value){
	const apikey = youtubeTOKEN;
	let index = 0;
	let url = decodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${value[1]}&type=video&key=${apikey}`);
			try{
			const res = await axios.request(url);

			// Video snippet
			let video = `https://www.youtube.com/watch?v=${res.data.items[index].id.videoId}`,
				title = res.data.items[index].snippet.title;


		// Video Stadistics
			let stadistics = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${res.data.items[index].id.videoId}&key=${apikey}`;
			const statisticRes = await axios.request(stadistics);
			const { viewCount, likeCount, dislikeCount, commentCount } = statisticRes.data.items[index].statistics;
			
			let videoCard = `Video solicitado: [▶️](${video})\n\n*${title}*\n\n👁 ${viewCount}\n\n  👍🏼${likeCount}  👎🏼${dislikeCount}\n\n💬 ${commentCount}`;

			bot.sendMessage(message.chat.id, videoCard, options(message));	

				/* bot.on('callback_query', function onCallbackQuery(button){
					if(button.data == 'next'){
						index++;
						bot.editMessageText(`Video solicitado: [▶️](https://www.youtube.com/watch?v=${res.data.items[index].id.videoId})`, replyDecorator);
					}
					if(button.data == 'back'){
						index--;
						if(index < 0){
							bot.editMessageText("No puedo ir mas atras, intenta ir a la siguiente.", replyDecorator);
						}else{
							bot.editMessageText(`Video solicitado: [▶️](https://www.youtube.com/watch?v=${res.data.items[index].id.videoId})`, replyDecorator);
						}
					}
				});	 */
		}catch(e){
		console.log(e);
		bot.sendMessage(message.chat.id,"No he encontrado el video solicitado");
	}
};
 

// Webshot command
async function snap(bot, message,value) {
	const url = `https://webshot.deam.io/${value[1]}?height=1000&width=1000`
	await bot.sendMessage(message.chat.id, `[👁‍🗨](${url})Mis ojos han llegado a este lugar.`,options(message));
}
		

// Full webshot command
async function fullSnap(bot, message, value) {
	const url = `https://webshot.deam.io/${value[1]}`
	await bot.sendMessage(message.chat.id, `[👁‍🗨](${url})Mis ojos han llegado a este lugar.`,options(message));
}
		
// Archivement command
async function logro(bot, message, value){
	let randomNumber = Math.floor(Math.random()*39+1);
	const url = decodeURI(`https://minecraftskinstealer.com/achievement/${randomNumber}/Logro desbloqueado/${value[1]}`);
	await bot.sendMessage(message.chat.id, `[🏆](${url})`,options(message));
}

/* async function quote(){
	let url = "";
	const req = await axios.request(url);
	console.log(req);
} */

function sounds(bot, message){
	const sounds = {
		omg: "https://ia601401.us.archive.org/4/items/funny-sounds/cardi%20b%20omg%20what%20is%20that.mp3",
		"hehe boe": "https://archive.org/download/funny-sounds/hehe-boe.mp3",
		"lets go": "https://archive.org/download/funny-sounds/letsgo.mp3",
		"yamete kudasai": "https://archive.org/download/funny-sounds/yamete-kudasai.mp3",
		"🌚": "https://archive.org/download/funny-sounds/love-moment.mp3",
		wow: "https://archive.org/download/funny-sounds/wow.mp3",
		no: "https://archive.org/download/funny-sounds/no-god.mp3",
		wtf: "https://archive.org/download/funny-sounds/wtf.mp3",
	};
	try {
		if(sounds[message.text.toLowerCase()]) bot.sendVoice(message.chat.id, request(sounds[message.text.toLowerCase()]));
	} catch (error) {
		return
	}
}

export { ytSearcher, img, snap, fullSnap, logro, sounds }
