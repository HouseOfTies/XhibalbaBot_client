import axios from "axios";
import config from "@/config";

export default function youtubeVideoStatisticsService(videoId: string) {
  const APIkey: string = config.multimedia.youtube;
  const part: string = "statistics";
  const id: string = videoId;
  const statistics: string = `https://www.googleapis.com/youtube/v3/videos?part=${part}&id=${id}&key=${APIkey}`;

  const payload = axios.get(statistics);
  return payload;
}
