import imageSearcherWorker from '@/jobs/imageSearchWorker'

export default async function imageSearcher(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const text: string = message.text.substring(indexOfSpace + 1);
  const verificator: number = message.text.split(" ").length;
  const imageToSend = await imageSearcherWorker(text);

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Prueba escribiendo algo luego del comando /img, Ejemplo: `/say telegram bot`",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, imageToSend, {
      reply_to_message_id: messageId,
      parse_mode: "Markdown",
    });
  }
}
