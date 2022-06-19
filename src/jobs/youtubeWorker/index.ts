import youtubeService from "@/services/youtubeService";
import youtubeVideoStatisticService from "@/services/youtubeService/statistics";
import youtubeCommentsService from "@/services/youtubeService/comments";
import supercharge from "@supercharge/strings";

export default async function youtubeWorker(query: string) {
  try {
    const requestedObject = await youtubeService(query);
    const data = requestedObject.data;
    const {
      id: { videoId },
      snippet: { title },
    } = data.items[0];

    const statisticObject: any = await youtubeVideoStatisticService(videoId);
    const commentsObject: any = await youtubeCommentsService(videoId);
    const individualComment = commentsObject.data.items[0].snippet;

    const { viewCount, likeCount, commentCount } =
      statisticObject.data.items[0].statistics;

    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
    let response = `
*Video solicitado*: [▶️](${videoLink})\n${title}

*Comentarios*:
`;

    for (let index = 0; index < 3; index++) {
      const { authorDisplayName, textOriginal } =
        commentsObject.data.items[index].snippet.topLevelComment.snippet;
      response += `💬 *${authorDisplayName}*: ${supercharge(textOriginal).limit(100, '...').get()}\n`;
    }

    console.log(response)
    return { response, viewCount, likeCount, commentCount };
  } catch (workerError) {
    console.log(workerError);
    return "No he podido encontrar el video especificado, intenta con otro titulo o escribe el nombre correcto.";
  }
}
