import githubWorker from "@/jobs/githubWorker";

export default async function github(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const text = message.text.split(" ");
  const verificator: number = text.length;
  const user = text[1];
  const repository = text[2] || null;

  const requestObject: any = await githubWorker(user, repository);

  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Adjunta un nombre de usuario para buscar sobre el, ejemplo: `/gh Seventty`\nTambien puedes buscar repositorios escribiendo el nombre de usuario + nombre del repositorio: `/gh bothousez xhibalbabot`",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, requestObject.response || "No he podido encontrar al usuario o repositorio especificado, intenta otro nombre o escribirlo correcto.", requestObject.buttons );
  }
}
