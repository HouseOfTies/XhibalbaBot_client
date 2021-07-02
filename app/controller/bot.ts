import TelegramBot from 'node-telegram-bot-api';
import { botConfig } from '../config/botConfig';
import commands from '../model/command';

const bot: TelegramBot = new TelegramBot(botConfig(), {polling: true});

bot.on('polling_error', error => {
	console.log(error);
});

console.log("\nConnected with the darkness of 7th\n");

// /\/note (?<arg1>\w+)\s?+(?<arg2>[\w\s]+)?/gm
bot.onText(/\+note (?<time>\w+)\s?(?<memo>[\w\s]+)/, (message, value) => {
    commands.githubCommand(bot,message,value);
    /* if(!time){
        bot.sendMessage(chat.id, "Introduce los campos de manera correcta: +note 10s tu mensaje (por ejemplo)\nRecuerda que tienes disponibles las banderas: s(segundos), m(minutos), h(horas), d(dias)");
    }else{
        bot.sendMessage(chat.id, `Tu nota ha sido escrita en el abismo 📝\n\nTiempo pautado: ${value![1]} ⏳\nMensaje: ${memo} 📌`, {reply_to_message_id: message_id});
    setTimeout(() => {
        bot.sendMessage(chat.id, `Pasó el tiempo 🛎\nTe recuerdo que me encomendaste un mensaje y este era:\n\n${memo}`, {reply_to_message_id: message_id});
    }, time);
    }; */
});

// \+gh (?<arg1>\w+)\s?(?<arg2>\w+)?
/* bot.onText(/\?gh (?<user>\w+)\s?(?<userRepo>\w+)?/, async(message, value) => {
    let user: string = value![1];
    let repository: string = value![2];
    let url: string = "https://api.github.com/";
    if (!repository) {
        url += `user/${user}`
        console.log(url);
    }else{
        url += `repos/${user}/${repository}`;
        console.log(url);
    }
}); */

bot.on('message', function (message) {
    console.log(
        message
    );
  });