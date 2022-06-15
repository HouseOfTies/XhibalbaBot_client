import { v4 as uuidv4 } from "uuid";
const helpBook = require("./helpbook.json");

/* let defaultIndex: number = 1;
let templateStringResponse: string = `${helpBook.name} ${helpBook.icon}\n`;
const buttonId: string = uuidv4();

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
  parse_mode: "Markdown",
};

export default function help(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const userId: number = message.from.id;

  bot.sendMessage(
    chatId,
    templateStringResponse +
      `*Indice: ${defaultIndex}*\n--------\n` +
      commandList(defaultIndex),
    buttons
  );

  bot.on(
    "callback_query",
    function onCallbackQuery(actionButton) {
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
            if (defaultIndex > 1) {
              defaultIndex--;
              updateBotMessageState(bot, actionButton.message.message_id - 1, chatId);
            }
            break;
          case "next":
            if (defaultIndex < helpBook.totalIndexes) {
              defaultIndex++;
              updateBotMessageState(bot, actionButton.message.message_id - 1, chatId);
            }
            break;
          case "close":
            defaultIndex = 1;
            bot.deleteMessage(chatId, messageId + 1);
            break;
        }
      }
    },
    { cache_time: 1 }
  );
}

const updateBotMessageState = (bot: any, messageId: number, chatId: number) => {
  let newStringResponse: string = `*Indice: ${defaultIndex}*\n--------\n`;
  console.log(defaultIndex);
  console.log(messageId);
  bot.editMessageText(
    templateStringResponse + newStringResponse + commandList(defaultIndex),
    {
      chat_id: chatId,
      message_id: messageId + 1,
      reply_markup: buttons.reply_markup,
      parse_mode: "Markdown",
    }
  );
};

const commandList = (index) => {
  const { icon, name, commands } = helpBook.indexes[index];
  let returnString = `*${name}* ${icon}\n\n`;

  for (var property of Object.keys(commands)) {
    returnString += `⚜️ *${property}*: ${commands[property]}\n\n`;
  }

  return returnString;
};
 */

export default function help(bot: any, message: any){
  const chatId = message.chat.id,
    messageId = message.message_id;
  const userId: number = message.from.id;
  bot.sendMessage(chatId, "Volvemos a lo basico");
}