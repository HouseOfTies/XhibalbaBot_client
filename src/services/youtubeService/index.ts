import axios from "axios";
import config from "@/config";

export default function youtubeService(videoQuery: string) {
  const APIkey: string = config.multimedia.youtube;
  const part: string = "snippet";
  const maxResults: number = 100;
  const query: string = videoQuery;
  const type: string = "video";
  const url: string = decodeURI(`https://www.googleapis.com/youtube/v3/search?part=${part}&maxResults=${maxResults}&q=${query}&type=${type}&key=${APIkey}`);

  //https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCS-MYAmiUs1JGl4RDJJvBlcgUXib7d0z8&textFormat=plainText&part=snippet&videoId=kffacxfA7G4&maxResults=3
  const payload = axios.get(url);
  return payload;
}
