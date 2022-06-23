export default function snapshots(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const commandFlag = message.text.split(" ")[0];
  const text: string = message.text.substring(indexOfSpace + 1);
  const verificator: number = message.text.split(" ").length;
  let url = `https://webshot.deam.io/${text}/`;
  let response = "";
  
  if (commandFlag == "/snap") {
    url += "?height=1000&width=1000";
    response += `[👁‍🗨](${url}) Mis ojos han llegado a este lugar.`;
  } else if (commandFlag == "/fullsnap") {
    response += `[👁‍🗨](${url}) Mis ojos han llegado a este lugar.`;
  }

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Prueba escribiendo algo luego del comando /snap o /fullsnap, Ejemplo: `/snap google.com",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, response, {
      reply_to_message_id: messageId,
      parse_mode: "Markdown",
    });
  }
}
