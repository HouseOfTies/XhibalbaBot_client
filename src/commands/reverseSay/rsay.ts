export default function rsay(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const text: string = message.text.substring(indexOfSpace + 1);
  const reversedText = text.split("").reverse().join("");
  const verificator: number = message.text.split(" ").length;

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Prueba escribiendo algo luego del comando /rsay, Ejemplo: `/rsay Hola mundo` para obtener un mensaje al reves.",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, reversedText, {
      reply_to_message_id: messageId,
      parse_mode: "Markdown",
    });
  }
}
