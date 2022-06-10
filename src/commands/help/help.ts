import { v4 as uuidv4 } from "uuid";
const helpBook = require("./helpbook.json");

let defaultIndex: number = 1;

export default function help(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const userId: number = message.from.id;
  const buttonId: string = uuidv4();
  let templateString: string = `Libro de ayuda ${helpBook.icon}\n`;

  const buttons: any = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "⬅️ Atrás",
            callback_data: "back " + buttonId,
          },
          {
            text: "Siguiente ➡️",
            callback_data: "next " + buttonId,
          },
        ],
        [
          {
            text: "Cerrar libro ❌",
            callback_data: "close " + buttonId,
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, templateString, buttons, {
    reply_to_message_id: messageId,
  });

  bot.on("callback_query", function onCallbackQuery(actionButton) {
    const data: any = actionButton.data.split(" ")[0];
    const buttonIdToTrigger: string = actionButton.data.split(" ")[1];
    const actionTriggeredByUserId: number = actionButton.from.id;
    const actionTriggeredInChatId: number = actionButton.message.chat.id;

    if (
      actionTriggeredByUserId == userId &&
      actionTriggeredInChatId == chatId &&
      buttonIdToTrigger == buttonId
    ) {
      switch (data) {
        case "back":
          /*if (defaultIndex > 1) {
              bot.editMessageText(`${templateString}Indice: ${actualIndex}\n--------\n`, {
              chat_id: chatId,
              message_id: messageId + 1,
              reply_markup: buttons.reply_markup,
            });
          }
             */
          if(defaultIndex > 1){
            defaultIndex--;
            console.log("Indice restado");  
          }else{
            console.log("No puedo restar mas");
          }
          break;
        case "next":
          if(defaultIndex < helpBook.totalIndexes){
            defaultIndex++;
            console.log("Indice sumado");
          }else{
            console.log("No puedo sumar mas");
          }
          break;
        case "close":
          bot.deleteMessage(chatId, messageId + 1);
          break;
      }
      console.log("Index actual: ", defaultIndex);
    }
  });
}
