export default function say(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const text: string = message.text.substring(indexOfSpace + 1);
  const verificator: number = message.text.split(" ").length;

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Prueba escribiendo algo luego del comando /say, Ejemplo: `/say hola mundo`",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, text, {
      reply_to_message_id: messageId,
      parse_mode: "Markdown",
    });
  }
}
