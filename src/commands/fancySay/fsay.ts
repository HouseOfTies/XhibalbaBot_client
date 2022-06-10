import applyCharStyle from "./charStyleMapper";

const styles = require("./styles.json");

export default function fsay(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const text: string = message.text.substring(indexOfSpace + 1);
  let styleList = "";
  const option: string = text.split(" ")[0];
  const stylesArr = Object.keys(styles).sort();
  const verificator: number = message.text.split(" ").length;

  for (let index = 0; index < stylesArr.length; index++) {
    styleList += `${index}: ${stylesArr[index]} >>> ${applyCharStyle(
      styles[stylesArr[index]],
      "Texto"
    )}\n`;
  }

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Este comando require de un (numero de estilo) y un (texto) para funcionar, prueba escribiendo: `/fsay medieval hola mundo`.\nTambien puedes ver la lista de estilos escribiendo `/fsay help`",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    if (text === "help") {
      bot.sendMessage(
        chatId,
        `Escribe /fsay *<numero de estilo> <texto>* para escribir una cadena de texto estilizado.\n\n*Estilos disponibles:* ${stylesArr.length}\n\n*Hoja de estilos 📖:\n ${styleList}...*`,
        {
          reply_to_message: messageId,
          parse_mode: "Markdown",
        }
      );
    } else {
      try {
        bot.sendMessage(
          chatId,
          applyCharStyle(
            styles[stylesArr[option]],
            text.substring(text.indexOf(" ") + 1)
          ),
          { reply_to_message: messageId, parse_mode: "Markdown" }
        );
      } catch (e) {
        bot.sendMessage(
          chatId,
          "Elige un estilo comprendido en la lista de estilos, puedes escribir `/fsay help` para ver los estilos disponibles.",
          {
            reply_to_message: messageId,
            parse_mode: "Markdown",
          }
        );
      }
    }
  }
}
