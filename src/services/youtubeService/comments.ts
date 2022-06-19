import axios from "axios";
import config from "@/config";

export default function youtubeCommentsService(videoId: string) {
  const APIkey: string = config.multimedia.youtube;
  const part: string = "snippet";
  const id: string = videoId;
  const textFormat: string = "plainText";
  const maxResults: string = "3";
  const comments: string = `https://www.googleapis.com/youtube/v3/commentThreads?key=${APIkey}&textFormat=${textFormat}&part=${part}&videoId=${id}&maxResults=${maxResults}`;

  const payload = axios.get(comments);
  return payload;
}
