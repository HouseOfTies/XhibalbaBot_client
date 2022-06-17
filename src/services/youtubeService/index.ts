import axios from "axios";
import config from "@/config";

export default function youtubeService(videoTitle: string) {
  const APIkey: string = config.multimedia.youtube;
  const part: string = "snippet";
  const maxResults: number = 100;
  const query: string = videoTitle;
  const type: string = "video";
  const url: string = decodeURI(`https://www.googleapis.com/youtube/v3/search?part=${part}&maxResults=${maxResults}&q=${query}&type=${type}&key=${APIkey}`);

  const payload = axios.get(url);
  return payload;
}
