import responses from './responses.js';
import dotenv from 'dotenv';

dotenv.config();

const youtubeTOKEN = process.env.remote_youtube_TOKEN || process.env.local_youtube_TOKEN;
const rapidapiTOKEN = process.env.remote_rapidapi_TOKEN || process.env.local_rapidapi_TOKEN;

const { options } = responses;

/* // Image searcher
bot.onText(/\/img (.+)/, (message, value) => {
	let decorator = {
		parse_mode : "Markdown",
		reply_to_message : message.message_id,
		reply_markup : {
			inline_keyboard : [
					[
						{text : "⬅️ Back", callback_data : 'back'},
						{text : "Next ➡️", callback_data : 'next'},
					]
			]
		}
	};
	
	let index = 0,
		messageID = message.message_id + 1,
		chatID = message.chat.id,
	payload = {
		method : 'GET',
		url : 'https://bing-image-search1.p.rapidapi.com/images/search',
		params : {q : value[1], count : '100'},
		headers : {
			'x-rapidapi-key': 'e486b8885bmshff68b752d62f77fp181960jsnc4e96d1307ea',
    'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
		}
	}
	const getImg = async payload => {
		let info = await axios.request(payload),
			image = `[🔭](${info.data.value[index].contentUrl}) He encontrado esta imagen:\n`;


		let replyDecorator = {
		chat_id : chatID,
		message_id : messageID,
		parse_mode : "Markdown",
		reply_markup : {
			inline_keyboard : [
					[
						{text : "⬅️ Back", callback_data : 'back'},
						{text : "Next ➡️", callback_data : 'next'},
					]
			]
		}
	}

		bot.sendMessage(message.chat.id, image, decorator);

		bot.on('callback_query', function onCallbackQuery(button){
			if(button.data == 'next'){
				index++;
				bot.editMessageText(`[🔭](${info.data.value[index].contentUrl}) He encontrado esta imagen:\n`, replyDecorator);
			}
			if(button.data == 'back'){
				index--;
				if(index < 0){
					bot.editMessageText("No puedo ir mas atras, intenta ir a la siguiente.", replyDecorator);
				}else{
				bot.editMessageText(`[🔭](${info.data.value[index].contentUrl}) He encontrado esta imagen:\n`, replyDecorator);
				}
			}
		});	
	};
	getImg(payload);
});



// youtube searcher command
bot.onText(/\/yt (.+)/, (message, value) => {
	let decorator = {
		parse_mode : "Markdown",
		reply_to_message : message.message_id,
		reply_markup : {
			inline_keyboard : [
				[
					{text : "⬅️ Back", callback_data : 'back'},
					{text : "Next ➡️", callback_data : 'next'},
				]
			]
		}
	};
	let index = 0,
		messageID = message.message_id + 1,
		chatID = message.chat.id;

	let replyDecorator = {
		chat_id : chatID,
		message_id : messageID,
		parse_mode : "Markdown",
		reply_markup : {
			inline_keyboard : [
				[
					{text : "⬅️ Back", callback_data : 'back'},
					{text : "Next ➡️", callback_data : 'next'},
				]
			]
		}
	};


	const apikey = youtubeTOKEN;
	let url = decodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${value[1]}&type=video&key=${apikey}`);
		const getVideo = async ()  => {
			try{
			const res = await axios.request(url);

			// Video snippet
			let video = `https://www.youtube.com/watch?v=${res.data.items[index].id.videoId}`,
				title = res.data.items[index].snippet.title;


		// Video Stadistics
			let stadistics = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${res.data.items[index].id.videoId}&key=${apikey}`;
			const statisticRes = await axios.request(stadistics);
			let viewCount = statisticRes.data.items[index].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				likeCount = statisticRes.data.items[index].statistics.likeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				dislikeCount = statisticRes.data.items[index].statistics.dislikeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			  commentCount = statisticRes.data.items[index].statistics.commentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				videoCard = `Video solicitado: [▶️](${video})\n\n*${title}*\n\n👁 ${viewCount}\n\n  👍🏼${likeCount}  👎🏼${dislikeCount}\n\n💬 ${commentCount}`;

			bot.sendMessage(message.chat.id, videoCard, decorator);	

				bot.on('callback_query', function onCallbackQuery(button){
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
				});	


		}catch{
		bot.sendMessage(message.chat.id,"No he encontrado el video solicitado");
		}
	};
	getVideo();
});
 */





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

export { snap, fullSnap, logro }