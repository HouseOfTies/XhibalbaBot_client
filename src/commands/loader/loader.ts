const spinners = require("./spinner.json");

export default function loader(bot: any, message: any) {
  const chatId = message.chat.id,
    messageId = message.message_id;
    const messageToEdit = message.message_id+1;
    let index = 0;

  bot.sendMessage(chatId, "ㅤ", { reply_to_message_id: messageId });

  setInterval(() => {
    if(index < spinners.arc.frames.length ){
      bot.editMessageText(spinners.arc.frames[index], {chat_id: chatId, message_id: messageToEdit});
      index++;
      if(index == spinners.arc.frames.length){
        index = 0;
      }
    }
  }, 2900)

  //bot.editMessageText("something", {chat_id: chatId, message_id: messageToEdit});
  /* for (let index = 0; index < spinners.arc.length; index++) {
    const char = spinners.arc[index];
    setInterval(() => {
      bot.editMessageText("algo", {chat_id: chatId, message_id: messageToEdit})
    }, spinners.arc.interval);
  } */
}