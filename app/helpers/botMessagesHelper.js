export const botMessagesHelper = (bot, message) => {
    
    const messageData = (data) => {
      for (const i in data) {
          if (Object.hasOwnProperty.call(data, i)) {
              const res = data[i];
              console.log(`${i}: ${res}`);
          }
      };
    };

    const messageLog = () => {
        const { message_id, text } = message;

        console.log(`\n\n--- MESSAGE LOG ---\n---- From:`);
        messageData(message.from);
        console.log("\n---- Chat:")
        messageData(message.chat);
        console.log(`\n---- Message: \nMessage ID: ${message_id}\nText: ${text}\n----`);       
    };

  return {
      messageLog
  }
};