import { v4 as uuidv4 } from "uuid";
const helpBook = require("./helpbook.json");

export default function help(bot: any, message: any) {
  const chatId = message.chat.id;
  const messageId = message.message_id;
  const userId: number = message.from.id;
  const initOption = Object.assign(
    { parse_mode: "Markdown" },
    getPagination(0, helpBook.totalIndexes),
  );

  bot.sendMessage(
    chatId,
    `Libro de comandos 📖\n *Indice: 0* \n\n${getPageFromBook(0)}`,
    initOption
  );

  bot.on("callback_query", function onCallbackQuery(message: any) {
    const msg = message.message;

    if (message.from.id != userId) {
      return;
    } else {
      const editOptions = Object.assign(
        { parse_mode: "Markdown" },
        getPagination(parseInt(message.data), helpBook.totalIndexes),
        { chat_id: msg.chat.id, message_id: msg.message_id }
      );

      bot.editMessageText(
        `Libro de comandos 📖\n *Indice:* ${message.data}\n\n${getPageFromBook(message.data)}`,
        editOptions
      );
    }
  });
}

function getPagination(current, maxpage) {
  var keys = [];
  if (current > 1) keys.push({ text: `«1`, callback_data: "1" });
  if (current > 2)
    keys.push({
      text: `‹${current - 1}`,
      callback_data: (current - 1).toString(),
    });
  keys.push({ text: `-${current}-`, callback_data: current.toString() });
  if (current < maxpage - 1)
    keys.push({
      text: `${current + 1}›`,
      callback_data: (current + 1).toString(),
    });
  if (current < maxpage)
    keys.push({ text: `${maxpage}»`, callback_data: maxpage.toString() });

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        keys
      ],
    }),
  };
}

function getPageFromBook(index: number){
  const { icon, name, commands } = helpBook.indexes[index];
  let returnString = `*${name}* ${icon}\n\n`;

  for (let property of Object.keys(commands)) {
    returnString += `- *Comando*: /${property}\n *Descripcion*:${commands[property]}\n\n`;
  }

  return returnString;
}
