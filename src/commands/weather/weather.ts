import weatherWorker from "@/jobs"

export default async function weather(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const text: string = message.text.substring(indexOfSpace + 1);
  const verificator: number = message.text.split(" ").length;

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Escribe el nombre de una ciudad luego del comando /weather o /clima, Ejemplo: `/clima San pedro de macoris o /weather new york`",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, await weatherWorker(text), {
      reply_to_message_id: messageId,
      parse_mode: "Markdown",
    });
  }
}
