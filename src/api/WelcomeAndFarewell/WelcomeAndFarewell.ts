import { tmpdir } from "os";
import imageCreator from "./imageCreator";

export default async function WelcomeAndFarewell(bot: any, message: any) {
  const tmp = tmpdir();
  const chatId = message.chat.id;
  const userEvent = message.new_chat_member || message.left_chat_member;

  const username = userEvent.username
    ? "@" + userEvent.username
    : (message.from.username = "");

  const userIdentity = `${userEvent.first_name || ""} ${
    userEvent.last_name || ""
  }`;

  const { title } = await bot.getChat(chatId);

  const profilePics = await bot.getUserProfilePhotos(userEvent.id);

  let titleText;
  let event;

  if(message.new_chat_member){
    titleText = "Welcome to";
    event = true;
  } else if(message.left_chat_member){
    titleText = "Goodbye from";
    event = false;
  }

 if (profilePics.total_count !== 0) {
    const recentPic = profilePics.photos[0][0].file_id;
    const { file_id } = await bot.getFile(recentPic);
    const imagePath = await bot.downloadFile(file_id, tmp);

    bot.sendSticker(
      chatId,
      await imageCreator(
        username,
        userIdentity,
        `${titleText} ${title}`,
        imagePath,
        event
      )
    );
  }  else {
    bot.sendSticker(
      chatId,
      await imageCreator(
        username,
        userIdentity,
        `${titleText} ${title}`,
        __dirname+`/../../assets/userPicNotFound.png`,
        event
      )
    );
  }
}
