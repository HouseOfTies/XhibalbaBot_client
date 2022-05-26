import applyCharStyle from "./charStyleMapper";

const styles = require("./styles.json");

export default function fsay(bot: any, message: any, value: string) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const text = value[1];
  const option: string = text.split(" ")[0];
  const styleList = Object.keys(styles).sort().join(", ").toString(); //all styles

  if (text === "help") {
    bot.sendMessage(
      chatId,
      `Escribe /fsay *<estilo> <texto>* para escribir una cadena de texto estilizado.\n\nEstilos disponibles:\n*${styleList}*`,
      {
        reply_to_message: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    if (Object.keys(styles).includes(option)) {
      bot.sendMessage(
        chatId,
        applyCharStyle(styles[option], text.substring(text.indexOf(" ") + 1)),
        { reply_to_message: messageId, parse_mode: "Markdown" }
      );
    } else {
      bot.sendMessage(chatId, text, {
        reply_to_message: messageId,
        parse_mode: "Markdown",
      });
    }
  }

  /* if (Object.keys(styles).includes(option)) {
    bot.sendMessage(
      chatId,
      applyCharStyle(styles[option], text.substring(text.indexOf(" ") + 1)),
      { reply_to_message: messageId, parse_mode: "Markdown" }
    );
  }else{
    bot.sendMessage(chatId, text, {
      reply_to_message: messageId,
      parse_mode: "Markdown",
    });
  } */
}
