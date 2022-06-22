import githubWorker from "@/jobs/githubWorker";

export default async function github(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const indexOfSpace: string = message.text.indexOf(" ");
  const text: string = message.text.substring(indexOfSpace + 1);
  const verificator: number = message.text.split(" ").length;
  const workerResponse: any = await githubWorker(text);

  console.log(workerResponse);


  if (verificator == 1) {
    bot.sendMessage(
      chatId,
      "Adjunta un nombre de usuario para buscar sobre el ejemplo: `/gh Seventty`\nTambien puedes buscar repositorios escribiendo el nombre de usuario + nombre del repositorio: `/gh seventty tekiah`",
      {
        reply_to_message_id: messageId,
        parse_mode: "Markdown",
      }
    );
  } else {
    //bot.sendMessage(chatId, response);
  }
}
