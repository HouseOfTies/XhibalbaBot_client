const contribuitorProfiles = require('./users.json');

export default function contribuitors(bot: any, message: any){
  const chatId = message.chat.id
  let templatedResponse = ''

  for (const titles of Object.keys(contribuitorProfiles)) {
    templatedResponse += `\n- ${titles.toUpperCase()} -\n`;
    contribuitorProfiles[titles].forEach(users => {
      templatedResponse += users+"\n"
    });
  }

  bot.sendMessage(chatId, `${templatedResponse}\nSin ustedes, nada sería lo mismo, ni sería igual.\nInfinitas gracias, chicos.`);
}