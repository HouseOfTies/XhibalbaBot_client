const styles = require("./styles.json");

export default function fsay(bot: any, message: any, value: string) {
  const chatId = message.chat.id,
    messageId = message.message_id;
  const text = value[1];
  const styleList = Object.keys(styles).join(", ").toString();

  
}
