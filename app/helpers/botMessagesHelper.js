import { DBhelper } from './DBhelper.js';

export const botMessagesHelper = (bot, message) => {
    const chatId = message.chat.id;
    const userId = message.from.id;
    
    const messageData = (data) => {
      for (const i in data) {
          if (Object.hasOwnProperty.call(data, i)) {
              const res = data[i];
              console.log(`${i}: ${res}`);
          }
      };
    };

    const messageLog = async () => {
        const { message_id, text, date } = message;
        const status = await DBhelper(bot,message).userChecker();

        console.log(`\n\n--- MESSAGE LOG ---\n---- From:`);
        messageData(message.from);
        console.log("\n---- Chat:")
        messageData(message.chat);
        console.log(`\n---- Message: \nMessage ID: ${message_id}\nText: ${text}\nTime: ${new Date(date * 1000).toLocaleTimeString("es-DO")}\n----`);
        console.log(`Status: ${status ? "Registered" : "Not registered"}`);
        
    };

    const whoResponse = async () => {
        const status = await DBhelper(bot,message).userChecker();
        let userDataTemplate = `⚜️ User profile ⚜️\n`;
        let user = (message.reply_to_message ? message.reply_to_message.from.id : userId);
        let nickName = "Apodo: ";
        if(status){
            nickName += await DBhelper(bot,message).selectNick();
        }else{
            nickName += "No disponible.";
        }

        try {
            const [photo, userData] = await Promise.all([
              bot.getUserProfilePhotos(user, {
                limit: 1,
              }),
              bot.getChatMember(chatId, user),
            ]);


            for (const i in userData.user) {
                if (Object.hasOwnProperty.call(userData.user, i)) {
                    const element = userData.user[i];
                     userDataTemplate += `\n${i}: ${element}`.replace("_", " ");
                };
            };

            userDataTemplate += `\n\nStatus: ${status ? "Registered 🟢" : "Not registered 🔴"}\n`;
            userDataTemplate += nickName.replace("null", "Ninguno");

             try {
              bot.sendPhoto(chatId, photo.photos[0][0].file_id, {
                caption: userDataTemplate,
                parse_mode: 'Markdown',
              });
            } catch (e) {
              bot.sendMessage(chatId, userDataTemplate);
            }
          } catch (e) {
              
          };
    };

  return {
      messageLog,
      whoResponse
  }
};