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
        let nick = "Nick: Coming soon";
        const userData = await bot.getChatMember(chatId, user);
        
       for (const i in userData.user) {
           if (Object.hasOwnProperty.call(userData.user, i)) {
               const element = userData.user[i];
                userDataTemplate += `\n${i}: ${element}`.replace("_", " ");
           };
       };
       userDataTemplate += `\n\nStatus: ${status ? "Registered 🟢" : "Not registered 🔴"}\n`;
       userDataTemplate += nick;
       bot.sendMessage(chatId, userDataTemplate);
    };

  return {
      messageLog,
      whoResponse
  }
};