import youtubeService from "@/services/youtubeService";

export default async function openWeatherWorker(videoTitle: string) {
  try {
    const requestedObject = await youtubeService(videoTitle);
    const data = requestedObject.data;
    const videoIdRequested = data.items[0].id.videoId;
    const videoTitleRequested = data.items[0].snippet.title;
    const videoLink = `https://www.youtube.com/watch?v=${videoIdRequested}`;

    const response = `
*Video solicitado*:
${videoTitleRequested}

[▶️](${videoLink})`;

    return response;
  } catch (workerError) {
    console.log(workerError);
    return "No he podido encontrar el video especificado, intenta otro nombre o escribirlo correcto.";
  }
}
