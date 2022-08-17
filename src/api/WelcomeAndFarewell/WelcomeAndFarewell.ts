export default async function WelcomeAndFarewell(bot: any, message: any) {
  const chatId = message.chat.id;
  const chatTitle = message.chat.title;
  const userId = message.from.id

  const profilePics = await bot.getUserProfilePhotos(userId);
  // const recentPic = profilePics.photos[0][0].file_id;

  console.log(profilePics);

  /* if (message.new_chat_members != undefined) {
    const nameNewMember = message.new_chat_member.username || message.new_chat_member.first_name;

    bot.sendMessage(
      chatId,
      "Hola " + nameNewMember + ", bienvenido al grupo " + chatTitle
    );
  } else if (message.left_chat_member != undefined) {
    const nameLeftMember = message.left_chat_member.first_name;

    bot.sendMessage(chatId, nameLeftMember + " abandonó el grupo");
  } */
}

